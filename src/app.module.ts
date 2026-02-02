import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CadContaController } from './cad-conta/cad-conta.controller';
import { CadContaService } from './cad-conta/cad-conta.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
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
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { RecsenhaUsuarioController } from './recsenha-usuario/recsenha-usuario.controller';
import { RecsenhaUsuarioService } from './recsenha-usuario/recsenha-usuario.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    //middleware para rotas dentro da aplicação (pós login)
    consumer.apply(VerifyloginusuarioMiddleware).forRoutes(AppController, CadContaController, VerificaLoginController, AutologinController, UsuarioController, MeusArquivosController, ControleCaixaController, DashboardController, RecsenhaUsuarioController)
  }
}
