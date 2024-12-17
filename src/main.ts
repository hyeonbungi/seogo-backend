import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from './_common/configs/init-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  initSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
