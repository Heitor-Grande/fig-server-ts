import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";
import { CadContaController } from "./cad-conta.controller";
import { CadContaService } from "./cad-conta.service";


@Module({
    providers: [CadContaService],
    controllers: [CadContaController]
})

export class cadContaModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(CadContaController)
    }
} {

}