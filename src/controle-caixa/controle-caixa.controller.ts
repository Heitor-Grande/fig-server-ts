import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ControleCaixaService } from './controle-caixa.service';

@Controller('controle-caixa')
export class ControleCaixaController {
    constructor(private readonly controleCaixaService: ControleCaixaService) { }
    @Get("/carregar/movimentos/caixa/:id_usuario")
    carregaMovimentosUsuario(@Param() params: any) {
        return this.controleCaixaService.carregaMovimentosDoCaixaUsuario(params)
    }
    @Post("/criar/novo/movimento")
    criaNovoMovimentoUsuario(@Body() body: any) {
        return this.controleCaixaService.criaNovoMovimentoUsuario(body)
    }
    @Get("/carregar/detalhes/movimento/:id_usuario/:id_movimento")
    carregaMovimentoById(@Param() params: any) {
        return this.controleCaixaService.carregaMovimentoById(params)
    }
    @Put("/atualizar/movimento/:id_usuario/:id_movimento")
    atualizaMovimentoUsuario(@Param() params: any, @Body() body: any) {
        return this.controleCaixaService.atualizaMovimentoUsuario(params, body)
    }
    @Delete("/excluir/movimento/:id_usuario/:id_movimento")
    excluirMovimentoUsuario(@Param() params: any) {
        return this.controleCaixaService.deletaMovimentoUsuario(params)
    }
    @Put("/upload/arquivo/movimento/:id_movimento/:id_usuario")
    uploadNovosArquivosMovimento(@Param() params: any, @Body() body: any) {
        return this.controleCaixaService.uploadArquivosMovimento(params, body)
    }
    @Delete("/deletar/arquivo/movimento/:id_movimento/:id_anexo/:id_usuario")
    deletarUploadDoMovimento(@Param() params: any) {
        return this.controleCaixaService.deletarAnexoMovimento(params)
    }
}
