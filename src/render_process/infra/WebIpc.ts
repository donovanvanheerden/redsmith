import { injectable } from 'inversify';
import { DbInfo } from '../../core/interfaces';
import * as Messages from '../../core/WindowMessages';
import { ConnectionOptions } from '../globals/interfaces';

export interface IWebIpc {
  /**
   * Creates a connection to redis using provided connection options.
   *
   * @param options Connection Options for redis
   * @returns Connection response, which contains number of dbs + stats, current db keys and current selected db
   */
  connect: (options: ConnectionOptions) => Promise<Messages.Connected>;
  switchDb: (db: DbInfo) => Promise<string[]>;
  get: (key: string) => Promise<string>;
  keys: () => Promise<string[]>;
  sendAsync: (value: string) => Promise<unknown>;
  send: (value: string) => unknown;
}

interface IpcWeb {
  send: (channel: string, ...args: unknown[]) => unknown;
  sendAsync: (channel: string, ...args: unknown[]) => void;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

@injectable()
export default class WebIpc implements IWebIpc {
  ipc: IpcWeb;

  constructor() {
    this.ipc = window.ipc;
  }

  async connect(options: ConnectionOptions): Promise<Messages.Connected> {
    const msg: Messages.CreateConnection = {
      type: Messages.MessageType.CREATE_CONNECTION,
      ...options,
    };

    const response = await window.ipc.sendAsync<
      Messages.Connected & Messages.ErrorMessage
    >(Messages.CHANNEL_NAME, msg);

    if (response.type === Messages.MessageType.ERROR) {
      return Promise.reject(response.error);
    }

    return response;
  }

  async switchDb(db: DbInfo): Promise<string[]> {
    const msg: Messages.SwitchDb = {
      type: Messages.MessageType.SWITCH_DB,
      db,
    };

    const response = await window.ipc.sendAsync<{
      type: Messages.MessageType;
      keys: string[];
    }>(Messages.CHANNEL_NAME, msg);

    return response.keys;
  }

  async get(key: string): Promise<string> {
    const method = 'get';

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('took too long');
      }, 5000);

      window.ipc.receive('get-reply', (data: string) => {
        clearTimeout(timeout);

        resolve(data);
      });

      window.ipc.sendAsync(method, key);
    });
  }

  async keys(): Promise<string[]> {
    const method = 'keys-message';

    return await window.ipc.sendAsync<string[]>(method);
  }

  async sendAsync(value: string): Promise<unknown> {
    const method = 'async-message';

    return await window.ipc.send(method, value);
  }

  send(value: string): unknown {
    const method = 'sync-message';

    return window.ipc.send(method, value);
  }
}
