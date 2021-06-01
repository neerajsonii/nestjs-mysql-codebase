import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product as IProduct } from '../../interfaces/product.interface';

@Table
export class Product extends Model<Product> implements IProduct {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
    })
    name: string;

    @Column({
        allowNull: false,
    })
    description: string;

    @Column({ defaultValue: false })
    isDeleted: boolean;

    @Column
    type: string;

    @Column({
        allowNull: false,
        unique: true,
    })
    url: string;
}
