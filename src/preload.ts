import { ipcRenderer, contextBridge } from 'electron';
import * as Messages from './core/WindowMessages';

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
      if (channel !== Messages.CHANNEL_NAME)
        return reject('Unknown Message Channel');

      ipcRenderer.send(channel, ...args);

      ipcRenderer.on(channel, (_, response) => {
        const responseMessage = response as Messages.Message;

        const isError = responseMessage.type === Messages.MessageType.ERROR;

        if (isError) {
          reject(response);
        } else {
          resolve(response);
        }

        ipcRenderer.removeAllListeners(channel);
      });

      ipcRenderer.on(channel, (_, response) => {
        reject(response);

        ipcRenderer.removeAllListeners(channel);
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
