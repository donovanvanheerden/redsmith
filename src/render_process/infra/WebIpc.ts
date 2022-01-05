import { injectable } from 'inversify';
import { Connection, DbInfo, Settings } from '../../core/interfaces';
import * as Messages from '../../core/WindowMessages';
import { ConnectionOptions } from '../globals/interfaces';

const ipc = window.ipc;

export interface IWebIpc {
  getConnections: () => Promise<Connection[]>;
  /**
   * Deletes a saved connection using the connection name provided
   * @param name Connection Name
   */
  deleteConnection: (name: string) => Promise<void>;
  /**
   * Creates a connection to redis using provided connection options.
   *
   * @param options Connection Options for redis
   * @returns Connection response, which contains number of dbs + stats, current db keys and current selected db
   */
  connect: (options: ConnectionOptions) => Promise<Messages.Connected>;
  /**
   * Switches Redis Dbs
   * @param db DbInfo instance to switch to
   * @returns keys for selected Redis Db
   */
  switchDb: (db: DbInfo) => Promise<string[]>;

  /**
   * Returns value for key
   * @param key string representation for redisKey
   * @returns value for redis key
   */
  getValue: (key: string) => Promise<Messages.GetStringValue>;
  /**
   * Sets value for key
   * @param key string representation for redisKey
   * @param value string value for redisKey
   */
  setValue: (key: string, value: string) => Promise<void>;
  /**
   * Removes the keys specified
   * @param keys array of keys to remove
   */
  removeKeys: (...key: string[]) => Promise<void>;
  /**
   * Renames redis key to new name
   * @param key current key
   * @param newName new name for current key
   */
  renameKey: (key: string, newName: string) => Promise<void>;
  /**
   * Sets expiry for key in seconds
   * @param key key to set expiry for
   * @param seconds timeout in seconds for key to expire
   */
  setKeyExpiry: (key: string, seconds: number) => Promise<void>;
  /**
   * Gets settings saved in store
   */
  getSettings: () => Promise<Settings>;
  /**
   * Saves settings
   * @param settings Settings Object from redux store
   */
  saveSettings: (settings: Settings) => Promise<void>;
}

@injectable()
export default class WebIpc implements IWebIpc {
  async connect(options: ConnectionOptions): Promise<Messages.Connected> {
    const msg: Messages.CreateConnection = {
      type: Messages.MessageType.CREATE_CONNECTION,
      ...options,
    };

    return await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async switchDb(db: DbInfo): Promise<string[]> {
    const msg: Messages.SwitchDb = {
      type: Messages.MessageType.SWITCH_DB,
      db,
    };

    const response = await ipc.sendAsync<Messages.DbSwitched>(Messages.CHANNEL_NAME, msg);

    return response.keys;
  }

  async getValue(key: string): Promise<Messages.GetStringValue> {
    const msg: Messages.GetStringValue = {
      type: Messages.MessageType.GET_VALUE,
      key,
    };

    return await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async setValue(key: string, value: string): Promise<void> {
    const msg: Messages.SetStringValue = {
      type: Messages.MessageType.SET_STRING_VALUE,
      key,
      value,
    };

    await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async removeKeys(...keys: string[]): Promise<void> {
    const msg: Messages.RemoveKey = {
      type: Messages.MessageType.REMOVE_KEY,
      keys,
    };

    await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async renameKey(key: string, newName: string): Promise<void> {
    const msg: Messages.RenameKey = {
      type: Messages.MessageType.RENAME_KEY,
      key,
      newName,
    };

    await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async setKeyExpiry(key: string, seconds: number): Promise<void> {
    const msg: Messages.SetKeyExpiry = {
      type: Messages.MessageType.SET_KEY_EXPIRY,
      key,
      seconds,
    };

    await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async getConnections(): Promise<Connection[]> {
    const msg: Messages.Message = {
      type: Messages.MessageType.GET_CONNECTIONS,
    };

    const response = await ipc.sendAsync<Messages.GetConnections>(Messages.CHANNEL_NAME, msg);

    return response.connections;
  }

  async deleteConnection(name: string): Promise<void> {
    const msg: Messages.DeleteConnection = {
      type: Messages.MessageType.DELETE_CONNECTION,
      name,
    };

    return await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }

  async getSettings(): Promise<Settings> {
    const msg: Messages.GetSettings = {
      type: Messages.MessageType.GET_SETTINGS,
    } as Messages.GetSettings;

    const response: Messages.GetSettings = await ipc.sendAsync(Messages.CHANNEL_NAME, msg);

    return response.settings;
  }

  async saveSettings(settings: Settings): Promise<void> {
    const msg: Messages.SaveSettings = {
      type: Messages.MessageType.SAVE_SETTINGS,
      settings,
    };

    return await ipc.sendAsync(Messages.CHANNEL_NAME, msg);
  }
}
