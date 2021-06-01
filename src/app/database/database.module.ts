import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { AppConfigModule as ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { Product } from '../modules/product/datasource/models/product.model';

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
                logQueryParameters: true,
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
    onModuleInit() {
        console.log('DataBaseModule initiated...');
    }
}
