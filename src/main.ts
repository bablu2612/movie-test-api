import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

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


  // Set body size limit for JSON payload
  app.use(bodyParser.json({ limit: '50mb' })); // Increase limit to 50MB

  // Set the file upload size limit
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
