import { ipcMain as ipc } from 'electron';
import { IRedisClient, RedisClient } from '../core/redisClient';

import * as Messages from '../core/WindowMessages';

interface IMainIpc {
  start: () => void;
}

export class MainIpc implements IMainIpc {
  private redis: IRedisClient;

  public start(): void {
    ipc.on(Messages.CHANNEL_NAME, this._handleIpc.bind(this));
  }

  private async _handleIpc(
    event: Electron.IpcMainEvent,
    arg: unknown
  ): Promise<void> {
    const message = arg as Messages.Message;
    let reply: Messages.Message = null;

    console.log(
      `Main IPC incoming: ${Messages.MessageType[message.type]} => `,
      message
    );

    switch (message.type) {
      case Messages.MessageType.CREATE_CONNECTION:
        reply = await this._handleCreateConnection(
          <Messages.CreateConnection>message
        );
        break;
      case Messages.MessageType.SWITCH_DB:
        reply = await this._handleSwitchDb(<Messages.SwitchDb>message);
        break;
      default:
        break;
    }

    if (reply !== null) {
      event.sender.send(Messages.CHANNEL_NAME, reply);
    }
  }

  private async _handleCreateConnection(
    message: Messages.CreateConnection
  ): Promise<Messages.Message> {
    this.redis = new RedisClient({
      host: message.host,
      port: message.port,
      password: message.password,
    });

    const response = await this.redis.info();

    const reply: Messages.Connected = {
      type: Messages.MessageType.CONNECTED,
      ...response,
    };

    return reply;
  }

  private async _handleSwitchDb(
    message: Messages.SwitchDb
  ): Promise<Messages.Message> {
    const response = await this.redis.switchDb(message.db.index);

    const reply: Messages.DbSwitched = {
      type: Messages.MessageType.DB_SWITCHED,
      keys: response,
    };

    return reply;
  }
}
