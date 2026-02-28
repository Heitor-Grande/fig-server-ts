import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from "dotenv"
import * as bodyParser from "body-parser"
import notify from './utils/notifyServiceWork';
import connection from './database/connection';
import { url } from 'inspector';

//inicia o dotenv
config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(bodyParser.json({ limit: '10mb' }))
  await app.listen(8080);
}

/*const webpush = require('web-push')
const keys = webpush.generateVAPIDKeys();
console.log(keys);*/

bootstrap()