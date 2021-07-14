/* 
    This is a repository file which talks to the database only.
    This class should be exposed to the current module only meaning only product service can access this repository class.
    No other external module can access this repository directly as it should not be exposed, if any other module want to talk to 
    product class(this class) that can be only possible through product service (service layer).
*/

import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository {
    constructor(@Inject(Product) private readonly product: typeof Product) { }

    public async findAll(): Promise<Product[]> {
        return this.product.findAll();
    }

    public create(createObj: any): Promise<any> {
        return this.product.create(createObj);
    }

    public async findOne(where: object): Promise<Product> {
        return this.product.findOne({ where });
    }

    public async findOneById(id: number): Promise<Product> {
        return this.product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });
    }

    public async update(updateObj: any, where: any): Promise<any> {
        return this.product.update(updateObj, where);
    }

    public async count(query: any): Promise<any> {
        return this.product.count(query);
    }

    public async delete(id: number): Promise<any> {
        return this.product.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }
}
