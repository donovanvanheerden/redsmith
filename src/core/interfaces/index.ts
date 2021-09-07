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
