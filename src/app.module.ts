import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicController } from './public/public.controller';
import { PublicService } from './public/public.service';
import { CadContaController } from './cad-conta/cad-conta.controller';
import { CadContaService } from './cad-conta/cad-conta.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { JwtpublicverifyMiddleware } from './jwtpublicverify/jwtpublicverify.middleware';
import { VerificaLoginController } from './verifica-login/verifica-login.controller';
import { VerificaLoginService } from './verifica-login/verifica-login.service';
import { VerifyloginusuarioMiddleware } from './verifyloginusuario/verifyloginusuario.middleware';

@Module({
  imports: [],
  controllers: [AppController, PublicController, CadContaController, LoginController, VerificaLoginController],
  providers: [AppService, PublicService, CadContaService, LoginService, VerificaLoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtpublicverifyMiddleware).forRoutes(CadContaController, LoginController)
    consumer.apply(VerifyloginusuarioMiddleware).forRoutes(VerificaLoginController)
  }
}
