import { Config } from './config.interface';

export const DEFAULT_CONFIG: Config = {
    env: 'local',
    port: 3000,
    enableRateLimit: true,
    enableSwagger: true,
    appName: 'FIRST_APP',

    databaseConfig: {
        username: 'root',
        password: 'admin123',
        database: 'local',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    },
};
