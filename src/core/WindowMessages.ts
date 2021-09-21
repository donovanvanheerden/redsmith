import { DbInfo } from './interfaces';

export const CHANNEL_NAME = 'async-message';

export enum MessageType {
  CREATE_CONNECTION,
  CONNECTED,
  SWITCH_DB,
  DB_SWITCHED,
  GET_VALUE,
  ERROR,
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

export interface SwitchDb extends Message {
  db: DbInfo;
}

export interface DbSwitched extends Message {
  keys: string[];
}

export interface GetStringValue extends Message {
  key: string;
  value?: string;
}

export interface ErrorMessage extends Message {
  message: string;
}
