import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { Config } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
    private config: Config;

    constructor(data: Config = DEFAULT_CONFIG) {
        this.config = data;
    }

    /**
     * Loads the config from environment variables.
     */
    public loadFromEnv() {
        this.config = ConfigService.parseConfigFromEnv(process.env);
    }

    private static parseConfigFromEnv(env: NodeJS.ProcessEnv): Config {
        return {
            env: env.NODE_ENV || DEFAULT_CONFIG.env,
            port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
            enableRateLimit:
                !!env.ENABLE_RATE_LIMIT || DEFAULT_CONFIG.enableRateLimit,
            enableSwagger: !!env.ENABLE_SWAGGER || DEFAULT_CONFIG.enableSwagger,
            appName: env.APP_NAME || DEFAULT_CONFIG.appName,
            databaseConfig: {
                port: +(env.DB_PORT || DEFAULT_CONFIG.databaseConfig.port),
                dialect:
                    env.DB_DIALECT || DEFAULT_CONFIG.databaseConfig.dialect,
                host: env.DB_HOST || DEFAULT_CONFIG.databaseConfig.host,
                database: env.DB_NAME || DEFAULT_CONFIG.databaseConfig.database,
                username: env.DB_USER || DEFAULT_CONFIG.databaseConfig.username,
                password: env.DB_PASS || DEFAULT_CONFIG.databaseConfig.password,
            },
        };
    }

    /**
     * Retrieves the config.
     * @returns immutable view of the config data
     */
    public get(): Readonly<Config> {
        return this.config;
    }
}
