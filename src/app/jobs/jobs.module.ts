import { Module, OnModuleInit, Provider } from '@nestjs/common';
import { ProductModule } from '../modules/product/product.module';
import { LoggerService } from '../shared/services/logger.service';
import { ProductCronJobService } from './product.job';
import { ScheduleModule } from '@nestjs/schedule';

const TOKEN = 'CRON_MODULE';

/*
    CRON_JOBS is a collection of all cron jobs to be executed in system
 */

const CRON_JOBS: Provider[] = [
    ProductCronJobService
];

/*
    CRON_JOBS_DEPS is a collection of all cron jobs dependencies.
    Add your dependencies as required
 */

const CRON_JOBS_DEPS = [] = [
    ScheduleModule.forRoot(),
    ProductModule
];

@Module({
    imports: [...CRON_JOBS_DEPS],
    providers: [...CRON_JOBS],
    exports: [...CRON_JOBS]
})
export class CronJobModule implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor() {
        this.logger = new LoggerService(TOKEN);
    }

    onModuleInit() {
        this.logger.log('Module initiated and ready');
    }
}