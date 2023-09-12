import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(process.env.APPLICATION_PORT);
  console.log(`Server running on port ${process.env.APPLICATION_PORT}`);
}
bootstrap();
