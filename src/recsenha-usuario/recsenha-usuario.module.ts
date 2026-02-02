import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RecsenhaUsuarioService } from "./recsenha-usuario.service";
import { RecsenhaUsuarioController } from "./recsenha-usuario.controller";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [RecsenhaUsuarioService],
    controllers: [RecsenhaUsuarioController]
})

export class RecsenhaModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(RecsenhaUsuarioController)
    }
}