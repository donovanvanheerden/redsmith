import Redis from 'ioredis';
import { ipcMain } from 'electron';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'agvlive.redis',
});

ipcMain.on('get-message', async (event, key: string) => {
  try {
    const value = await redis.get(key);
    event.reply('get-reply', value);
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on('keys-message', async (event) => {
  try {
    redis.select(1);

    const keys = await redis.keys('*');

    event.reply('keys-reply', keys);
  } catch (error) {
    console.log(error);
  }
});
