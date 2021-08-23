import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...args) => {
    return ipcRenderer.sendSync(channel, ...args);
  },
  sendAsync: (channel, ...args) => {
    console.log('sending to channel: ', channel);
    ipcRenderer.send(channel, ...args);
  },
  receive: (channel, handler) => {
    ipcRenderer.on(channel, (event, ...args) => handler(...args));
  },
} as IpcWeb);

interface IpcWeb {
  send: (channel: string, ...args: unknown[]) => unknown;
  sendAsync: (channel: string, ...args: unknown[]) => void;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ipc: IpcWeb;
  }
}

window.ipc = window.ipc || ({} as IpcWeb);
