import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ControleCaixaService } from './controle-caixa.service';
import { Response } from 'express';

@Controller('controle-caixa')
export class ControleCaixaController {
    constructor(private readonly controleCaixaService: ControleCaixaService) { }
    @Get("/carregar/movimentos/caixa")
    carregaMovimentosUsuario(@Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.carregaMovimentosDoCaixaUsuario(res)
    }
    @Post("/criar/novo/movimento")
    criaNovoMovimentoUsuario(@Body() body: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.criaNovoMovimentoUsuario(body, res)
    }
    @Get("/carregar/detalhes/movimento/:id_movimento")
    carregaMovimentoById(@Param() params: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.carregaMovimentoById(params, res)
    }
    @Put("/atualizar/movimento/:id_movimento")
    atualizaMovimentoUsuario(@Param() params: any, @Body() body: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.atualizaMovimentoUsuario(params, body, res)
    }
    @Delete("/excluir/movimento/:id_movimento")
    excluirMovimentoUsuario(@Param() params: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.deletaMovimentoUsuario(params, res)
    }
    @Put("/upload/arquivo/movimento/:id_movimento")
    uploadNovosArquivosMovimento(@Param() params: any, @Body() body: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.uploadArquivosMovimento(params, body, res)
    }
    @Delete("/deletar/arquivo/movimento/:id_movimento/:id_anexo")
    deletarUploadDoMovimento(@Param() params: any, @Res({ passthrough: true }) res: Response) {
        return this.controleCaixaService.deletarAnexoMovimento(params, res)
    }
}
