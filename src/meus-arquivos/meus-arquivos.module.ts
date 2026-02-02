import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MeusArquivosService } from "./meus-arquivos.service";
import { MeusArquivosController } from "./meus-arquivos.controller";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [MeusArquivosService],
    controllers: [MeusArquivosController]
})

export class MeusArquivosModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(MeusArquivosController)
    }
}