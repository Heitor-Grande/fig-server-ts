import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { diaAgendaType } from 'src/types/globalTypes';
import { Response } from 'express';

@Controller('agenda')
export class AgendaController {

    constructor(private readonly serviceAgenda: AgendaService) { }

    @Post("/criar/novo/agendamento")
    criarAgendamento(@Body() body: diaAgendaType, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.criarNovoAgendamento(body, res.locals.idUsuario)
    }

    @Get("/carregar/total/agendamentos/dia/mes/:mes/:ano")
    carregarAgendamentosTotalDiaMes(@Param() params: { mes: string, ano: string }, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.carregaQtdAgendamentosMensal(params.mes, params.ano, res.locals.idUsuario)
    }
}
