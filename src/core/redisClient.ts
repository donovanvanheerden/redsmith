import Redis from 'ioredis';
import { DbInfo } from './interfaces';

export interface IRedisClient {
  connect: () => Promise<ConnectedResponse>;
  disconnect: () => Promise<void>;
  switchDb: (index: number) => Promise<string[]>;
  info: () => Promise<ConnectedResponse>;
  keys: (pattern?: string) => Promise<string[]>;
  getString: (key: string) => Promise<string>;
  setString: (key: string, value: string) => Promise<void>;
  removeKeys: (...key: string[]) => Promise<boolean>;
  renameKey: (key: string, newName: string) => Promise<boolean>;
  setKeyExpiry: (key: string, seconds: number) => Promise<boolean>;
}

const defaultDb = (index: number): DbInfo => ({
  index,
  name: `db${index}`,
  keys: 0,
  expires: 0,
  avgTtl: 0,
});

// parse db1:keys=1747,expires=0,avg_ttl=0

const parsekeyspace = (keyspace: string): DbInfo => {
  const [dbName, info] = keyspace.split(':');

  const [keys, expires, avgTtl] = info.split(',');

  return {
    index: parseInt(dbName.replace('db', '')),
    name: dbName,
    keys: parseInt(keys.split('=')[1]),
    expires: parseInt(expires.split('=')[1]),
    avgTtl: parseInt(avgTtl.split('=')[1]),
  } as DbInfo;
};

interface ConnectedResponse {
  dbs: DbInfo[];
  keys: string[];
  selectedDb: number;
  name?: string;
}

export class RedisClient implements IRedisClient {
  config: Redis.RedisOptions;
  redis: Redis.Redis;

  selectedDb: number;

  constructor(config: Redis.RedisOptions) {
    this.config = config;
    this.selectedDb = config.db || 0;
  }

  async connect(): Promise<ConnectedResponse> {
    try {
      this.redis = new Redis({
        ...this.config,
        autoResubscribe: false,
        lazyConnect: true,
        maxRetriesPerRequest: 0,
      });
    } catch (error) {
      console.log('error occured: ', error);
    }

    return await this.info();
  }

  async disconnect(): Promise<void> {
    this.redis.disconnect();
  }

  async info(): Promise<ConnectedResponse> {
    const [, dbs] = await this.redis.config('GET', 'databases');
    const keyspace = await this.redis.info('keyspace');

    const dbInfo: DbInfo[] = keyspace
      .split('\r\n')
      .filter((key) => key.startsWith('db'))
      .map(parsekeyspace);

    const dbInfos: DbInfo[] = new Array(parseInt(dbs))
      .fill(null)
      .map((_, idx) => {
        const existing = dbInfo.find((d) => d.index === idx);

        if (!existing) return defaultDb(idx);

        return existing;
      });

    const keys = await this.keys();

    return {
      dbs: dbInfos,
      keys,
      selectedDb: this.selectedDb,
    };
  }

  async keys(pattern = '*'): Promise<string[]> {
    const keys = await this.redis.keys(pattern);

    return keys;
  }

  async getString(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async setString(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async switchDb(index: number): Promise<string[]> {
    await this.redis.select(index);

    return await this.keys();
  }

  async removeKeys(...key: string[]): Promise<boolean> {
    const affected = await this.redis.del(key);

    return affected > 0;
  }

  async renameKey(key: string, newName: string): Promise<boolean> {
    const response = await this.redis.rename(key, newName);

    return response !== 'OK';
  }

  async setKeyExpiry(key: string, seconds: number): Promise<boolean> {
    const response = await this.redis.expire(key, seconds);

    return response !== 0;
  }
}
