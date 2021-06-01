import { Module, OnModuleInit } from '@nestjs/common';
import { AppConfigModule as ConfigModule } from '../../config/config.module';
import { PipeModule } from './pipes/pipe.module';

@Module({
    imports: [ConfigModule, PipeModule],
    controllers: [],
    providers: [],
    exports: [ConfigModule, PipeModule],
})
export class SharedModule implements OnModuleInit {
    onModuleInit() {
        console.log('SharedModule initiated ...');
    }
}
