import { Body, Controller, Get, Param, Post, Delete, Res } from '@nestjs/common';
import { MeusArquivosService } from './meus-arquivos.service';
import { Response } from 'express';

@Controller('meus-arquivos')
export class MeusArquivosController {
    constructor(private readonly meusArquivosService: MeusArquivosService) { }
    @Get("/carregar/meus/uploads")
    carregarUploadsUsuario(@Res({ passthrough: true }) res: Response) {
        return this.meusArquivosService.carregarUploadUsuarioById(res)
    }
    @Post("/novo/upload/arquivos")
    subirNovoArquivoUsuario(@Body() body: any, @Res({ passthrough: true }) res: Response) {
        return this.meusArquivosService.criarNovoUpLoad(body, res)
    }
    @Delete("/deletar/arquivo/usuario/:id_arquivo")
    excluirArquivo(@Param() params: any, @Res({ passthrough: true }) res: Response) {
        return this.meusArquivosService.excluirUpload(params, res)
    }
}
