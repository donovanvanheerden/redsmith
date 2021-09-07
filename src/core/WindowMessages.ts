import { DbInfo } from './interfaces';

export const CHANNEL_NAME = 'async-message';

export enum MessageType {
  CREATE_CONNECTION,
  CONNECTED,
}

export interface Message {
  type: MessageType;
}

export interface CreateConnection extends Message {
  name: string;
  host: string;
  port: number;
  password?: string;
}

export interface Connected extends Message {
  dbs: DbInfo[];
  keys: string[];
  selectedDb: number;
}
