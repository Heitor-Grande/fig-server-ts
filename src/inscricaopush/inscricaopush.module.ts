import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InscricaopushService } from './inscricaopush.service';
import { InscricaopushController } from './inscricaopush.controller';
import { VerifyloginusuarioMiddleware } from 'src/utils/verifyloginusuario.middleware';

@Module({
    providers: [InscricaopushService],
    controllers: [InscricaopushController]
})
export class InscricaopushModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(InscricaopushController)
    }
}
