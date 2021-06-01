/* 
    This is a service file which takes care of business logic and the database interaction using repository class only.
    All other external services or classes should be injected here.
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../datasource/dao/product.repository';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepository) {}

    public async getProducts(): Promise<Product[]> {
        try {
            return this.productRepo.findAll();
        } catch (error) {
            console.log(`Error on getProducts :: ${error.message}`);
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
            this.handleInternalError(error);
        }
    }

    public async removeProduct(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.delete({ id });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.handleInternalError(error);
        }
    }

    public async addProducts(product: Product): Promise<any> {
        try {
            await this.productRepo.create(product);
            return { message: 'Product created.' };
        } catch (error) {
            this.handleInternalError(error);
        }
    }

    private handleInternalError(error: Error) {
        console.log(`Internal Server Error:  ${error.message}`);
        throw error;
    }
}
