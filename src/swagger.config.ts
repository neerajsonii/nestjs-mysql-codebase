import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './app/config/config';

export const setUpSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle(config().appName)
        .setDescription('Server description')
        .setVersion('1.0')
        .setLicense('NestJs Docs', 'https://docs.nestjs.com/')
        .setContact('Neeraj Soni', 'https://github.com/neerajsonii', 'iamneerajsonii@gmail.com')
        .build();
    return SwaggerModule.createDocument(app, options);
};
