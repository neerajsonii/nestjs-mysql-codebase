import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, Delete } from '@nestjs/common';
import { CreateProductPayload, DeleteProductParams, GetProductParams } from '../dto/product.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, 
    ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(':id')
    @ApiOkResponse({ description: 'Record fetched successfully' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiNotFoundResponse({ status: 404, description: 'Resource not found.' })
    public async getProduct(@Param() param: GetProductParams): Promise<Product> {
        return this.productService.getProduct(param.id);
    };

    @Delete(':id')
    @ApiOkResponse({ description: 'Record deleted successfully' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiNotFoundResponse({ status: 404, description: 'Resource not found.' })
    public async removeProduct(@Param() param: DeleteProductParams): Promise<Product> {
        return this.productService.removeProduct(param.id);
    };

    @Get()
    @ApiOkResponse({ description: 'Record fetched successfully' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiNotFoundResponse({ status: 404, description: 'Resource not found.' })
    public async getProductList(): Promise<Product[]> {
        return this.productService.getProducts();
    };

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiNotFoundResponse({ status: 404, description: 'Resource not found.' })
    @UsePipes(ValidationPipe)
    public async addProduct(@Body() body: CreateProductPayload): Promise<Product> {
        return this.productService.addProducts(body.data);
    };

}
