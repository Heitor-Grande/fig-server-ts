import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteController } from './lembrete.controller';
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
  providers: [LembreteService],
  controllers: [LembreteController]
})

export class LembreteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(VerifyloginusuarioMiddleware).forRoutes(LembreteController)
  }
}
