import Redis from 'ioredis';
import { DbInfo } from './interfaces';

export interface IRedisClient {
  switchDb: (index: number) => Promise<void>;
  info: () => Promise<ConnectedResponse>;
  keys: (pattern?: string) => Promise<string[]>;
  get: (key: string) => Promise<unknown>;
  setString: (key: string, value: string) => Promise<void>;
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
}

export class RedisClient implements IRedisClient {
  redis: Redis.Redis;

  selectedDb: number;

  constructor(config: Redis.RedisOptions) {
    this.redis = new Redis(config);

    this.selectedDb = config.db || 0;
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
