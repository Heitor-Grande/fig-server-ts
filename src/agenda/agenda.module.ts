import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { VerifyloginusuarioMiddleware } from 'src/utils/verifyloginusuario.middleware';

@Module({
  controllers: [AgendaController],
  providers: [AgendaService]
})
export class AgendaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(VerifyloginusuarioMiddleware).forRoutes(AgendaController)
  }
}