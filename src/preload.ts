import { ipcRenderer, contextBridge } from 'electron';

interface IpcWeb {
  send: (channel: string, ...args: unknown[]) => unknown;
  sendAsync: (channel: string, ...args: unknown[]) => void;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...args) => {
    return ipcRenderer.sendSync(channel, ...args);
  },
  sendAsync: (channel, ...args) => {
    // console.log('sending to channel: ', channel);
    ipcRenderer.send(channel, ...args);
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
