import { ipcRenderer, contextBridge } from 'electron';

interface IpcWeb {
  send: (channel: string, ...args: unknown[]) => unknown;
  sendAsync: <T>(channel: string, ...args: unknown[]) => Promise<T>;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...args) => {
    return ipcRenderer.sendSync(channel, ...args);
  },
  sendAsync: async (channel, ...args) => {
    return await new Promise((resolve, reject) => {
      ipcRenderer.send(channel, ...args);

      const replyChannel = channel.replace('message', 'reply');
      const errChannel = channel.replace('message', 'error');

      ipcRenderer.on(replyChannel, (_, response) => {
        resolve(response);

        ipcRenderer.removeAllListeners(replyChannel);
      });

      ipcRenderer.on(errChannel, (_, response) => {
        reject(response);

        ipcRenderer.removeAllListeners(replyChannel);
      });
    });
  },
  receive: (channel, handler) => {
    ipcRenderer.on(channel, (_, ...args) => {
      handler(...args);

      // remove listeners after event is handled?
      ipcRenderer.removeAllListeners(channel);
    });
  },
} as IpcWeb);

declare global {
  interface Window {
    ipc: IpcWeb;
  }
}

window.ipc = window.ipc || ({} as IpcWeb);
