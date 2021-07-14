import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { config } from '../config/config';
import { Product } from '../modules/product/datasource/models/product.model';
import { LoggerService } from '../shared/services/logger.service';

const TOKEN = 'DATABASE_MODULE';

const logger = new Logger('QUERY');
@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (): SequelizeOptions => ({
                dialect: config().databaseConfig.dialect as Dialect,
                host: config().databaseConfig.host,
                port: +config().databaseConfig.port,
                username: config().databaseConfig.username,
                password: config().databaseConfig.password,
                database: config().databaseConfig.database,
                models: [Product],
                pool: {
                    max: 5,
                },
                logQueryParameters: false, // making it true will log the query params in the console.
                logging: (rawQuery: string) => {
                    logger.log(rawQuery);
                },
                define: {
                    paranoid: true,
                    freezeTableName: true,
                    timestamps: true,
                },
                sync: {
                    // ! ALWAYS FALSE IN PROD
                    force: !(process.env.NODE_ENV.trim() === 'production'),
                },
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class DataBaseModule implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor() {
        this.logger = new LoggerService(TOKEN);
    }

    onModuleInit() {
        this.logger.log('Module initiated and ready');
    }
}
