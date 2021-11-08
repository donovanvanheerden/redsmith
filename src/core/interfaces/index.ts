export interface DbInfo {
  /**
   * Db index
   */
  index: number;
  /**
   * Db Name
   */
  name: string;
  /**
   * Db key count
   */
  keys: number;
  /**
   * Db expires value
   */
  expires: number;
  /**
   * Average time to live
   */
  avgTtl: number;
}

export interface Connection {
  name: string;
  host: string;
  port: number;
  password: string;
}
