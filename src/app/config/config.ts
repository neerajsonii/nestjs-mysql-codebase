import { Config } from './config.interface';

const DEFAULT_CONFIG: Config = {
  env: 'local',
  port: 3000,
  enableRateLimit: true,
  enableSwagger: true,
  appName: 'appName',
  jwtSecret: 'SOME_RANDOM_SECRET',

  databaseConfig: {
    username: 'root',
    password: 'admin123',
    database: 'local',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
};

const env: NodeJS.ProcessEnv = process.env;

export const config = (): Config => ({
  env: env.NODE_ENV || DEFAULT_CONFIG.env,
  port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
  enableRateLimit: !!env.ENABLE_RATE_LIMIT || DEFAULT_CONFIG.enableRateLimit,
  enableSwagger: !!env.ENABLE_SWAGGER || DEFAULT_CONFIG.enableSwagger,
  appName: env.APP_NAME || DEFAULT_CONFIG.appName,
  jwtSecret: env.JWT_SECRET || DEFAULT_CONFIG.jwtSecret,
  databaseConfig: {
    port: +(env.DB_PORT || DEFAULT_CONFIG.databaseConfig.port),
    dialect: env.DB_DIALECT || DEFAULT_CONFIG.databaseConfig.dialect,
    host: env.DB_HOST || DEFAULT_CONFIG.databaseConfig.host,
    database: env.DB_NAME || DEFAULT_CONFIG.databaseConfig.database,
    username: env.DB_USER || DEFAULT_CONFIG.databaseConfig.username,
    password: env.DB_PASS || DEFAULT_CONFIG.databaseConfig.password,
  },
});
