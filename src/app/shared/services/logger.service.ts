import { Injectable, Logger, LoggerService as ILoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements ILoggerService {
    private readonly logger: Logger;
    constructor(private readonly context: string) {
        this.logger = new Logger(this.context, true);
    }
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        this.logger.log(message, ...optionalParams);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message, ...optionalParams);
     }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message, ...optionalParams);
    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(message, ...optionalParams);
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        this.logger.verbose(message, ...optionalParams);
     }
}