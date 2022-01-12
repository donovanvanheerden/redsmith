import { ipcMain as ipc } from 'electron';
import { Connection } from '../core/interfaces';
import { IRedisClient, RedisClient } from '../core/redisClient';
import Store from '../core/store';

import { getWindow } from './Main';

import * as Messages from '../core/WindowMessages';

interface IMainIpc {
  start: () => void;
}

export class MainIpc implements IMainIpc {
  private redis: IRedisClient;

  public start(): void {
    ipc.on(Messages.CHANNEL_NAME, this._handleIpc.bind(this));
  }

  private async _handleIpc(event: Electron.IpcMainEvent, arg: unknown): Promise<void> {
    const message = arg as Messages.Message;
    let reply: Messages.Message = null;

    console.log(`Main IPC incoming: ${Messages.MessageType[message.type]} => `, message);

    try {
      switch (message.type) {
        case Messages.MessageType.GET_CONNECTIONS:
          reply = await this._handleGetConnections();
          break;
        case Messages.MessageType.CREATE_CONNECTION:
          reply = await this._handleCreateConnection(<Messages.CreateConnection>message);
          break;
        case Messages.MessageType.DELETE_CONNECTION:
          await this._handleDeleteConnection(<Messages.DeleteConnection>message);
          break;
        case Messages.MessageType.SWITCH_DB:
          reply = await this._handleSwitchDb(<Messages.SwitchDb>message);
          break;
        case Messages.MessageType.GET_KEYS:
          reply = await this._handleGetKeys(<Messages.GetKeys>message);
          break;
        case Messages.MessageType.GET_VALUE:
          reply = await this._handleGetStringValue(<Messages.GetStringValue>message);
          break;
        case Messages.MessageType.SET_STRING_VALUE:
          await this._handleSetStringValue(<Messages.SetStringValue>message);
          break;
        case Messages.MessageType.REMOVE_KEY:
          await this._handleRemoveKey(<Messages.RemoveKey>message);
          break;
        case Messages.MessageType.RENAME_KEY:
          await this._handleRenameKey(<Messages.RenameKey>message);
          break;
        case Messages.MessageType.SET_KEY_EXPIRY:
          await this._handleSetKeyExpiry(<Messages.SetKeyExpiry>message);
          break;
        case Messages.MessageType.SAVE_SETTINGS:
          await this._handleSaveSettings(<Messages.SaveSettings>message);
          break;
        case Messages.MessageType.GET_SETTINGS:
          reply = await this._handleGetSettings();
          break;
        // Window Controls
        case Messages.MessageType.CLOSE:
          this._handleClose();
          break;
        case Messages.MessageType.MAXIMIZE:
          this._handleMaximize();
          break;
        case Messages.MessageType.MINIMIZE:
          this._handleMinimize();
          break;
        default:
          break;
      }
    } catch (error) {
      const err: Messages.ErrorMessage = {
        message: error as string,
        type: Messages.MessageType.ERROR,
      };

      reply = err;
    }

    if (reply !== null) {
      event.sender.send(Messages.CHANNEL_NAME, reply);
    }
  }

  private async _handleGetConnections(): Promise<Messages.GetConnections> {
    const connections = Store.get('connections');

    const msg: Messages.GetConnections = {
      type: Messages.MessageType.GET_CONNECTIONS,
      connections: Object.keys(connections).map((key) => connections[key]),
    };

    return msg;
  }

  private async _handleCreateConnection(message: Messages.CreateConnection): Promise<Messages.Message> {
    this.redis = new RedisClient({
      name: message.name,
      host: message.host,
      port: message.port,
      password: message.password,
    });

    try {
      const response = await this.redis.connect();

      const connection: Connection = {
        host: message.host,
        port: message.port,
        password: message.password,
        name: message.name,
      };

      const connections = Store.get('connections');

      Store.set('connections', {
        ...connections,
        [connection.name]: connection,
      });

      const reply: Messages.Connected = {
        type: Messages.MessageType.CONNECTED,
        name: connection.name,
        ...response,
      };

      return reply;
    } catch (error) {
      this.redis.disconnect();

      console.error('unhandled error: ', error);

      return Promise.reject(`Unable to connect to ${message.name} (${message.host}:${message.port}).`);
    }
  }

  private async _handleSwitchDb(message: Messages.SwitchDb): Promise<Messages.Message> {
    const response = await this.redis.switchDb(message.db.index);

    const reply: Messages.DbSwitched = {
      type: Messages.MessageType.DB_SWITCHED,
      keys: response,
    };

    return reply;
  }

  private async _handleGetKeys(message: Messages.GetKeys): Promise<Messages.Message> {
    const response = await this.redis.keys(message.searchPattern);

    const reply: Messages.GetKeys = {
      ...message,
      keys: response,
    };

    return reply;
  }

  private async _handleGetStringValue(message: Messages.GetStringValue): Promise<Messages.Message> {
    const response = await this.redis.getString(message.key);

    const reply: Messages.GetStringValue = {
      type: Messages.MessageType.GET_VALUE,
      ...message,
      value: response,
    };

    return reply;
  }

  private async _handleSetStringValue(message: Messages.SetStringValue): Promise<void> {
    await this.redis.setString(message.key, message.value);
  }

  private async _handleRemoveKey(message: Messages.RemoveKey): Promise<void> {
    await this.redis.removeKeys(...message.keys);
  }

  private async _handleRenameKey(message: Messages.RenameKey): Promise<void> {
    await this.redis.renameKey(message.key, message.newName);
  }

  private async _handleSetKeyExpiry(message: Messages.SetKeyExpiry): Promise<void> {
    await this.redis.setKeyExpiry(message.key, message.seconds);
  }

  private async _handleDeleteConnection(message: Messages.DeleteConnection): Promise<void> {
    const connections = Store.get('connections');

    delete connections[message.name];

    Store.set('connections', connections);

    const redisConnection = this.redis.getConnectionName();

    if (message.name === redisConnection) await this.redis.disconnect();

    return Promise.resolve();
  }

  private async _handleGetSettings(): Promise<Messages.GetSettings> {
    const settings = Store.get('settings');

    const reply: Messages.GetSettings = {
      type: Messages.MessageType.GET_SETTINGS,
      settings,
    };

    return Promise.resolve(reply);
  }

  private async _handleSaveSettings(message: Messages.SaveSettings): Promise<void> {
    Store.set('settings', message.settings);

    return Promise.resolve();
  }

  private _handleClose() {
    const win = getWindow();

    win.close();
  }

  private _handleMaximize() {
    const win = getWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

  private _handleMinimize() {
    const win = getWindow();

    if (win.minimizable) win.minimize();
  }
}
