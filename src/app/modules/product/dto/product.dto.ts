import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Matches } from 'class-validator';
import { Type as ValidateType } from 'class-transformer';
import { GenericPayload } from '../../../shared/models/base.dto';
import { Product } from '../interfaces/product.interface';
import { urlRegex } from '../../../shared/shared.constants';

export class GetProductById {
    @ApiProperty({ description: 'product id', type: Number, default: 1 })
    @IsString()
    @IsDefined()
    id: number;
}

export class CreateProductPayloadData implements Product {
    @ApiProperty({ description: 'Name of the product', type: String })
    @IsString()
    @IsDefined()
    name: string;

    @ApiProperty({ description: 'Description of the product', type: String })
    @IsString()
    @IsDefined()
    description: string;

    @ApiProperty({ description: 'type of the product', type: String })
    @IsString()
    @IsDefined()
    type: string;

    @ApiProperty({ description: 'web link of the product', type: String })
    @IsString()
    @IsDefined()
    @Matches(urlRegex, { message: '[URL] Should be a valid URL' })
    url: string;
}

export class CreateProductPayload extends GenericPayload<
    CreateProductPayloadData
> {
    @ApiProperty({ description: 'Create Product payload' })
    @ValidateType(() => CreateProductPayloadData)
    public data!: CreateProductPayloadData;
}

export class GetProductParams extends GetProductById {}

export class DeleteProductParams extends GetProductById {}
