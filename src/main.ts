import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config as awsConfig } from 'aws-sdk';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.enableCors({
    origin: config.get<string>('APP_URL'),
    credentials: true
  });
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tasteless API')
    .setDescription('The tasteless API description')
    .setVersion('1.0')
    .build();

  const swaggerOptions = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha'
    },
    customSiteTitle: 'Tasteless API Docs'
  }

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions);

  awsConfig.update({
    accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY'),
    region: config.get<string>('AWS_REGION'),
  });

  await app.listen(port, () => {
    // TODO use nest logger
    console.log('[API]', `http://localhost:${config.get<string>('PORT')}`);
    console.log('[DOCS]', `http://localhost:${config.get<string>('PORT')}/api`);
  });
}

bootstrap();
