/* 
    This is a service file which takes care of business logic and the database interaction using repository class only.
    All other external services or classes should be injected here.
*/

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../../../shared/services/logger.service';
import { ProductRepository } from '../datasource/dao/product.repository';
import { Product } from '../interfaces/product.interface';

const TOKEN = 'PRODUCT_SERVICE';
@Injectable()
export class ProductService implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor(private productRepo: ProductRepository) {
        this.logger = new LoggerService(TOKEN);
    }
    
    onModuleInit() {
        // do something here on loading this service.
    }

    public async getProducts(): Promise<Product[]> {
        try {
            return this.productRepo.findAll();
        } catch (error) {
            this.logger.error(`Error on getProducts :: ${error.message}`);
            throw error;
        }
    }

    public async getProduct(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.findOneById(id);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.logger.error(`Error on getProduct :: ${error.message}`);
            this.handleInternalError(error);
        }
    }

    public async removeProduct(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.delete(id);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.logger.error(`Error on removeProduct :: ${error.message}`);
            this.handleInternalError(error);
        }
    }

    public async addProducts(product: Product): Promise<any> {
        try {
            await this.productRepo.create(product);
            return { message: 'Product created.' };
        } catch (error) {
            this.logger.error(`Error on addProducts :: ${error.message}`);
            this.handleInternalError(error);
        }
    }

    private handleInternalError(error: Error) {
        throw error;
    }
}
