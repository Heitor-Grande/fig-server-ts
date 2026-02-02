import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { VerificaLoginController } from "./verifica-login.controller";
import { VerificaLoginService } from "./verifica-login.service";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [VerificaLoginService],
    controllers: [VerificaLoginController]
})

export class VerificaLoginModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(VerificaLoginController)
    }
}