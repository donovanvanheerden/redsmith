import Redis from 'ioredis';
import { ipcMain } from 'electron';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'agvlive.redis',
});

ipcMain.on('async-message', (event, arg) => {
  console.log('async-message: ', arg); // prints "ping"
  event.reply('async-reply', 'pong');
});

ipcMain.on('sync-message', (event, arg) => {
  console.log('sync-message: ', arg); // prints "ping"
  event.returnValue = 'pong';
});

ipcMain.on('get', async (event, key: string) => {
  try {
    const value = await redis.get(key);
    event.reply('get-reply', value);
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on('keys', async (event) => {
  try {
    redis.select(1);

    const keys = await redis.keys('*');
    event.reply('keys-reply', keys);
  } catch (error) {
    console.log(error);
  }
});
