import { ipcRenderer, IpcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, data) => {
    return ipcRenderer.sendSync(channel, data);
  },
  sendAsync: (channel, data) => {
    console.log('sending to channel: ', channel);
    ipcRenderer.send(channel, data);
  },
  receive: (channel, handler) => {
    ipcRenderer.on(channel, (event, ...args) => handler(...args));
  },
} as IpcWeb);

interface IpcWeb {
  send: (channel: string, data: unknown) => unknown;
  sendAsync: (channel: string, data: unknown) => void;
  receive: (channel: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ipc: IpcWeb;
  }
}

window.ipc = window.ipc || ({} as IpcWeb);
