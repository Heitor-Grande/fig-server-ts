import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioController } from "./usuario.controller";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [UsuarioService],
    controllers: [UsuarioController]
})

export class usuarioModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(UsuarioController)
    }
}