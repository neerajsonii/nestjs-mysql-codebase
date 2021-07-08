import { Module, OnModuleInit } from '@nestjs/common';
import { AppConfigModule as ConfigModule } from '../../config/config.module';
import { PipeModule } from './pipes/pipe.module';
import { LoggerService } from './services/logger.service';

const TOKEN = 'SHARED_MODULE';

@Module({
    imports: [ConfigModule, PipeModule],
    controllers: [],
    providers: [],
    exports: [ConfigModule, PipeModule],
})
export class SharedModule implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor() {
        this.logger = new LoggerService(TOKEN);
    }

    onModuleInit() {
        this.logger.log('Module initiated and ready');
    }
}
