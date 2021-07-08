import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { AppConfigModule as ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { Product } from '../modules/product/datasource/models/product.model';
import { LoggerService } from '../shared/services/logger.service';

const TOKEN = 'DATABASE_MODULE';

const logger = new Logger('QUERY');
@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): SequelizeOptions => ({
                dialect: configService.get().databaseConfig.dialect as Dialect,
                host: configService.get().databaseConfig.host,
                port: +configService.get().databaseConfig.port,
                username: configService.get().databaseConfig.username,
                password: configService.get().databaseConfig.password,
                database: configService.get().databaseConfig.database,
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
