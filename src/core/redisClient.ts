import Redis from 'ioredis';

export interface IRedisClient {
  switchDb: (index: number) => Promise<void>;
  info: () => Promise<void>;
  keys: (pattern?: string) => Promise<string[]>;
  get: (key: string) => Promise<unknown>;
  setString: (key: string, value: string) => Promise<void>;
}

export class RedisClient implements IRedisClient {
  redis: Redis.Redis;

  constructor(config?: unknown) {
    this.redis = new Redis({
      host: '127.0.0.1',
      port: 6379,
      password: 'agvlive.redis',
    });
  }

  async info(): Promise<void> {
    const info = await this.redis.info();

    console.log(info);
  }

  async keys(pattern = '*'): Promise<string[]> {
    const keys = await this.redis.keys(pattern);

    return keys;
  }

  async get(key: string): Promise<unknown> {
    return await this.redis.get(key);
  }

  async setString(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async switchDb(index: number): Promise<void> {
    await this.redis.select(index);
  }
}
