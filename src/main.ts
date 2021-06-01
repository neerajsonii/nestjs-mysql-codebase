import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setUpSwagger } from './swagger.config';
import { ConfigService } from './config/config.service';
import { Config } from './config/config.interface';

async function configSwagger(app: INestApplication): Promise<OpenAPIObject> {
    return setUpSwagger(app);
}

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.enableCors();
    if (configService.get().enableRateLimit) {
        app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
                message: 'Too much requests, seems like a DDOS attack',
            })
        );
    }
    if (configService.get().enableSwagger) {
        const document: OpenAPIObject = await configSwagger(app);
        SwaggerModule.setup('api-docs', app, document);
    }
    await app.listen(configService.get().port);
    const config: Config = configService.get();
    console.log(
        `Application :: ${config.appName} is running and pointing to => ${config.env}`
    );
}
bootstrap();
