import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicController } from './public/public.controller';
import { PublicService } from './public/public.service';
import { CadContaController } from './cad-conta/cad-conta.controller';
import { CadContaService } from './cad-conta/cad-conta.service';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [AppController, PublicController, CadContaController, LoginController],
  providers: [AppService, PublicService, CadContaService],
})
export class AppModule {}
