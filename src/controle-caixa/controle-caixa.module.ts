import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ControleCaixaController } from "./controle-caixa.controller";
import { ControleCaixaService } from "./controle-caixa.service";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [ControleCaixaService],
    controllers: [ControleCaixaController]
})

export class controleCaixaModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(ControleCaixaController)
    }
}