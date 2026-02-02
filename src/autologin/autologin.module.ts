import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AutologinController } from './autologin.controller'
import { AutologinService } from './autologin.service'
import { VerifyloginusuarioMiddleware } from 'src/utils/verifyloginusuario.middleware'


@Module({
    providers: [AutologinService],
    controllers: [AutologinController]
})

export class AutologinModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(AutologinService)
    }
}