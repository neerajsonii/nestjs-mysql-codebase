import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { setUpSwagger } from './swagger.config';
import { ConfigService } from './config/config.service';
import { Config } from './config/config.interface';
import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { ResponseTransformInterceptor } from './app/shared/interceptors/response.interceptors';
import { LoggerService } from './app/shared/services/logger.service';

const NEST_LOGGING = process.env.ENABLE_LOGGING;

async function configSwagger(app: INestApplication): Promise<OpenAPIObject> {
    return setUpSwagger(app);
}

async function bootstrap() {
    const opts: NestApplicationOptions = {};
    if (!NEST_LOGGING) { opts.logger = false; }
    const app: INestApplication = await NestFactory.create<INestApplication>(AppModule, opts);
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    const config: Config = app.get(ConfigService).get();
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.enableCors();
    if (config.enableRateLimit) {
        app.use(rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too much requests, seems like a DDOS attack',
        }));
    }
    if (config.enableSwagger) {
        const document: OpenAPIObject = await configSwagger(app);
        SwaggerModule.setup('api-docs', app, document);
    }
    await app.listen(config.port);
    new LoggerService('APP').log(`Application :: ${config.appName} is running and pointing to => ${config.env}`);
}
bootstrap();
