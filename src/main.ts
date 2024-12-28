import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the "uploads" directory
  app.useStaticAssets(join(__dirname, '..', 'uploads/'));

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all standard HTTP methods
    allowedHeaders: '*', // Allow all headers
  });

  await app.listen(3000);
}
bootstrap();
