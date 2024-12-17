import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   '/posts',
  //   rateLimit({
  //     windowMs: 60 * 1000, // 1 menit
  //     max: 5, // Maksimum 5 request
  //     message: 'Terlalu banyak permintaan ke endpoint ini.',
  //   }),
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
