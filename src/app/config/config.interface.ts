export interface DatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
}

export interface Config {
  /**
   * The name of the environment.
   * @example 'test', 'development', 'staging', 'production'
   */
  env: string;

  appName: string;

  /** The port number of the http server to listen on. */
  port: number;

  databaseConfig: DatabaseConfig;

  enableRateLimit: boolean;
  
  enableSwagger: boolean;
  
  jwtSecret: string;
}
