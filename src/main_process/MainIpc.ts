import { ipcMain } from 'electron';

ipcMain.on('async-message', (event, arg) => {
  console.log('async-message: ', arg); // prints "ping"
  event.reply('async-reply', 'pong');
});

ipcMain.on('sync-message', (event, arg) => {
  console.log('sync-message: ', arg); // prints "ping"
  event.returnValue = 'pong';
});
