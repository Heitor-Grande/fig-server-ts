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
import { AutologinController } from './autologin/autologin.controller';
import { AutologinService } from './autologin/autologin.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { MeusArquivosController } from './meus-arquivos/meus-arquivos.controller';
import { MeusArquivosService } from './meus-arquivos/meus-arquivos.service';
import { ControleCaixaController } from './controle-caixa/controle-caixa.controller';
import { ControleCaixaService } from './controle-caixa/controle-caixa.service';

@Module({
  imports: [],
  controllers: [AppController, PublicController, CadContaController, LoginController, VerificaLoginController, AutologinController, UsuarioController, MeusArquivosController, ControleCaixaController],
  providers: [AppService, PublicService, CadContaService, LoginService, VerificaLoginService, AutologinService, UsuarioService, MeusArquivosService, ControleCaixaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //middleware para rotas dentro da aplicação (antes do login) - public
    consumer.apply(JwtpublicverifyMiddleware).forRoutes(CadContaController, LoginController)
    //middleware para rotas dentro da aplicação (pós login)
    consumer.apply(VerifyloginusuarioMiddleware).forRoutes(VerificaLoginController)
  }
}
