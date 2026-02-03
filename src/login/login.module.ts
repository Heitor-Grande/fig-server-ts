import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { VerifyloginusuarioMiddleware } from 'src/utils/verifyloginusuario.middleware'


@Module({
    providers: [LoginService],
    controllers: [LoginController]
})

export class LoginModule {

}