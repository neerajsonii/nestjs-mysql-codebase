import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { ProductMiddleware } from '../app/shared/middlewares/product.middleware';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { DataBaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DataBaseModule,
        SharedModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ProductMiddleware).forRoutes('*');
    }
}
