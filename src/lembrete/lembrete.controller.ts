import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteType } from 'src/types/globalTypes';
import { Response } from 'express';

@Controller('lembrete')
export class LembreteController {

    constructor(private readonly lembreteService: LembreteService) { }

    @Post("/criar")
    criarLembrete(@Body() body: LembreteType, @Res({ passthrough: true }) res: Response) {

        return this.lembreteService.criarLembrete(body, res)
    }

    @Get("/carregar/todos/lembretes")
    carregarLembretes(@Res({ passthrough: true }) res: Response) {

        return this.lembreteService.carregarLembretes(res)
    }

    @Put("/atualizar/lembrete")
    atualizarLembrete(@Body() body: LembreteType, @Res({ passthrough: true }) res: Response) {

        return this.lembreteService.atualizarLembrete(body, res)
    }

    @Delete("/remover/:idlembrete")
    deletarLembrete(@Param() params: { idlembrete: string }, @Res({ passthrough: true }) res: Response) {

        return this.lembreteService.deletarLembrete(params, res)
    }
}
