export interface ConnectionOptions {
  /**
   * The name of the connection
   */
  name: string;
  /**
   * The hostname for the connection
   */
  host: string;
  /**
   * The port for the connection
   */
  port: number;
  /**
   * The password for the connection
   */
  password?: string;
}
