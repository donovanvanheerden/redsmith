export interface IWebIpc {
  sendAsync: (value: string) => Promise<unknown>;
  send: (value: string) => unknown;
}

interface IpcWeb {
  send: (channel: string, data: unknown) => unknown;
  sendAsync: (channel: string, data: unknown) => void;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

export default class WebIpc implements IWebIpc {
  ipc: IpcWeb;

  constructor() {
    this.ipc = window.ipc;
  }

  async sendAsync(value: string): Promise<unknown> {
    const method = 'async-message';

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('took too long');
      }, 5000);

      window.ipc.receive('async-reply', (data) => {
        clearTimeout(timeout);

        resolve(data);
      });

      window.ipc.sendAsync(method, value);
    });
  }

  send(value: string): unknown {
    const method = 'sync-message';

    return window.ipc.send(method, value);
  }
}
