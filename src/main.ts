import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

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

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(port, () => {
    // TODO use nest logger
    console.log('[API]', `http://localhost:${config.get<string>('PORT')}`);
    console.log('[DOCS]', `http://localhost:${config.get<string>('PORT')}/api`);
  });
}

bootstrap();
