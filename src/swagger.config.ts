import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from './config/config.interface';
import { ConfigService } from './config/config.service';

export const setUpSwagger = (app: INestApplication) => {
    const appConfig: Config = app.get(ConfigService).get();
    const options = new DocumentBuilder()
        .setTitle(appConfig.appName)
        .setDescription('Server description')
        .setVersion('1.0')
        .setLicense('NestJs Docs', 'https://docs.nestjs.com/')
        .setContact('Neeraj Soni', 'https://github.com/neerajsonii', 'iamneerajsonii@gmail.com')
        .build();
    return SwaggerModule.createDocument(app, options);
};
