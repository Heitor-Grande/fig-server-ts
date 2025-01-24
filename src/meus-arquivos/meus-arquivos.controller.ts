import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MeusArquivosService } from './meus-arquivos.service';

@Controller('meus-arquivos')
export class MeusArquivosController {
    constructor(private readonly meusArquivosService: MeusArquivosService) { }
    @Get("/carregar/meus/uploads/:id_usuario")
    carregarUploadsUsuario(@Param() params: any) {
        return this.meusArquivosService.carregarUploadUsuarioById(params)
    }
    @Post("/novo/upload/arquivos/:id_usuario")
    subirNovoArquivoUsuario(@Param() params: any, @Body() body: any) {
        return this.meusArquivosService.criarNovoUpLoad(params, body)
    }
    @Delete("/deletar/arquivo/usuario/:id_usuario/:id_arquivo")
    excluirArquivo(@Param() params: any) {
        return this.meusArquivosService.excluirUpload(params)
    }
}
