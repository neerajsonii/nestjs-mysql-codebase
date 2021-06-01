import { Module, OnModuleInit, Provider } from '@nestjs/common';
import { DataBaseModule } from '../../database/database.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './datasource/dao/product.repository';
import { Product } from './datasource/models/product.model';
import { PRODUCT } from './product.constants';
import { ProductService } from './services/product.service';

const productProviders: Provider[] = [
    {
        provide: PRODUCT,
        useValue: Product,
    },
];

@Module({
    imports: [SharedModule, DataBaseModule],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, ...productProviders],
    exports: [ProductService],
})
export class ProductModule implements OnModuleInit {
    onModuleInit() {
        console.log('ProductModule initiated ...');
    }
}
