import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { MongooseExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseExceptionFilter());

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    // origin: (origin, callback) => {
    //   const allowedOrigins = process.env.FRONTEND_URL;
    //   if (!origin || allowedOrigins.indexOf(origin) === -1) {
    //     return callback(new Error('Not allowed by CORS'), false);
    //   }
    //   return callback(null, true);
    // },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Event Org API')
    .setDescription('Description Event Org API')
    .setVersion('1.0')
    .addTag('users')
    .addTag('event')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
