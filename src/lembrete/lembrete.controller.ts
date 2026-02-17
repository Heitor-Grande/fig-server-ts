import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteType } from 'src/types/globalTypes';

@Controller('lembrete')
export class LembreteController {

    constructor(private readonly lembreteService: LembreteService) { }

    @Post("/criar")
    criarLembrete(@Body() body: LembreteType) {

        return this.lembreteService.criarLembrete(body)
    }

    @Get("/carregar/todos/lembretes/:idusuario")
    carregarLembretes(@Param() params: { idusuario: string }) {

        return this.lembreteService.carregarLembretes(params)
    }

    @Put("/atualizar/lembrete")
    atualizarLembrete(@Body() body: LembreteType) {

        return this.lembreteService.atualizarLembrete(body)
    }

    @Delete("/remover/:idlembrete/:idusuario")
    deletarLembrete(@Param() params: { idlembrete: string, idusuario: string }) {

        return this.lembreteService.deletarLembrete(params)
    }
}
