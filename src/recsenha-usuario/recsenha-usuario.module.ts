import { Module } from "@nestjs/common";
import { RecsenhaUsuarioService } from "./recsenha-usuario.service";
import { RecsenhaUsuarioController } from "./recsenha-usuario.controller";

@Module({
    providers: [RecsenhaUsuarioService],
    controllers: [RecsenhaUsuarioController]
})

export class RecsenhaModule {

}