import { Module } from '@nestjs/common';
import { ValidationPipe } from './validation/validation.pipe';

@Module({
    imports: [ValidationPipe],
    controllers: [],
    providers: [],
    exports: [ValidationPipe],
})
export class PipeModule {}
