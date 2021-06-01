import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class GenericPayload<PayloadData> {
    @ValidateNested()
    @IsObject()
    @IsNotEmpty()
    public data!: PayloadData;
}
