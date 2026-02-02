import { Module } from "@nestjs/common";
import { MeusArquivosService } from "./meus-arquivos.service";
import { MeusArquivosController } from "./meus-arquivos.controller";

@Module({
    providers: [MeusArquivosService],
    controllers: [MeusArquivosController]
})

export class MeusArquivosModule{
    
}