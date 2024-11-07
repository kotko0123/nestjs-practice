import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {winstonLogger} from "./winston.config";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  await app.listen(3000);
  Logger.log('app started.');

}

bootstrap();
