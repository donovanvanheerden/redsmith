import { Connection, DbInfo, Settings } from './interfaces';

export const CHANNEL_NAME = 'async-message';

export enum MessageType {
  GET_CONNECTIONS,
  CREATE_CONNECTION,
  DELETE_CONNECTION,
  CONNECTED,
  SWITCH_DB,
  DB_SWITCHED,
  GET_VALUE,
  SET_STRING_VALUE,
  REMOVE_KEY,
  RENAME_KEY,
  SET_KEY_EXPIRY,
  ERROR,
  GET_SETTINGS,
  SAVE_SETTINGS,
  GET_KEYS,
}

export interface Message {
  type: MessageType;
}

export interface GetConnections extends Message {
  connections: Connection[];
}

export interface CreateConnection extends Message {
  name: string;
  host: string;
  port: number;
  password?: string;
}

export interface DeleteConnection extends Message {
  name: string;
}

export interface Connected extends Message {
  dbs: DbInfo[];
  keys: string[];
  selectedDb: number;
  name: string;
}

export interface SwitchDb extends Message {
  db: DbInfo;
}

export interface DbSwitched extends Message {
  keys: string[];
}

export interface GetKeys extends Message {
  searchPattern: string;
  keys?: string[];
}

export interface GetStringValue extends Message {
  key: string;
  value?: string;
}

export interface SetStringValue extends Message {
  key: string;
  value: string;
}

export interface RemoveKey extends Message {
  keys: string[];
}

export interface RenameKey extends Message {
  key: string;
  newName: string;
}

export interface SetKeyExpiry extends Message {
  key: string;
  seconds: number;
}
export interface ErrorMessage extends Message {
  message: string;
}

export interface GetSettings extends Message {
  settings: Settings;
}

export interface SaveSettings extends Message {
  settings: Settings;
}
