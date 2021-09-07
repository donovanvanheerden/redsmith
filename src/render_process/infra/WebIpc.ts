import { injectable } from 'inversify';

export interface IWebIpc {
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
