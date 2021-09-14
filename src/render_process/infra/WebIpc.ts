import { injectable } from 'inversify';
import { DbInfo } from '../../core/interfaces';
import * as Messages from '../../core/WindowMessages';
import { ConnectionOptions } from '../globals/interfaces';

const ipc = window.ipc;

export interface IWebIpc {
  /**
   * Creates a connection to redis using provided connection options.
   *
   * @param options Connection Options for redis
   * @returns Connection response, which contains number of dbs + stats, current db keys and current selected db
   */
  connect: (options: ConnectionOptions) => Promise<Messages.Connected>;
  /**
   * Switches Redis Dbs
   * @param db DbInfo instance to switch to
   * @returns keys for selected Redis Db
   */
  switchDb: (db: DbInfo) => Promise<string[]>;
}

@injectable()
export default class WebIpc implements IWebIpc {
  async connect(options: ConnectionOptions): Promise<Messages.Connected> {
    const msg: Messages.CreateConnection = {
      type: Messages.MessageType.CREATE_CONNECTION,
      ...options,
    };

    return await ipc.sendAsync<Messages.Connected>(Messages.CHANNEL_NAME, msg);
  }

  async switchDb(db: DbInfo): Promise<string[]> {
    const msg: Messages.SwitchDb = {
      type: Messages.MessageType.SWITCH_DB,
      db,
    };

    const response = await ipc.sendAsync<Messages.DbSwitched>(
      Messages.CHANNEL_NAME,
      msg
    );

    return response.keys;
  }
}
