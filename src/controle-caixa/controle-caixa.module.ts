import { Module } from "@nestjs/common";
import { ControleCaixaController } from "./controle-caixa.controller";
import { ControleCaixaService } from "./controle-caixa.service";

@Module({
    providers: [ControleCaixaService],
    controllers: [ControleCaixaController]
})

export class controleCaixaModule {

}