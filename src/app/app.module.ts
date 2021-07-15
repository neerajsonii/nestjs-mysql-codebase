import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { ProductMiddleware } from '../app/shared/middlewares/product.middleware';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { DataBaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { CronJobModule } from './jobs/jobs.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[config]
        }),
        DataBaseModule,
        SharedModule,
        ProductModule,
        CronJobModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ProductMiddleware).forRoutes('*');
    }
}
