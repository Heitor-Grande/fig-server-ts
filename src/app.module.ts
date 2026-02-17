import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerifyloginusuarioMiddleware } from './utils/verifyloginusuario.middleware';
import { AutologinModule } from './autologin/autologin.module';
import { cadContaModule } from './cad-conta/cad-conta.module';
import { controleCaixaModule } from './controle-caixa/controle-caixa.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { MeusArquivosModule } from './meus-arquivos/meus-arquivos.module';
import { RecsenhaModule } from './recsenha-usuario/recsenha-usuario.module';
import { usuarioModule } from './usuario/usuario.module';
import { VerificaLoginModule } from './verifica-login/verifica-login.module';
import { LembreteController } from './lembrete/lembrete.controller';
import { LembreteModule } from './lembrete/lembrete.module';

@Module({
  imports: [AutologinModule, cadContaModule, controleCaixaModule, DashboardModule, LoginModule, MeusArquivosModule, RecsenhaModule, usuarioModule, VerificaLoginModule, LembreteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
