import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { diaAgendaType, agendaDiaProps } from 'src/types/globalTypes';
import { Response } from 'express';

@Controller('agenda')
export class AgendaController {

    constructor(private readonly serviceAgenda: AgendaService) { }

    @Put("/finalizar/agendamento/:idAgendamento")
    finalizarAgendamento(@Res({ passthrough: true }) res: Response, @Param() params: { idAgendamento: string }) {

        return this.serviceAgenda.finalizarAgendamento(res, params.idAgendamento)
    }

    @Put("/aprovar/agendamento/:idAgendamento")
    aprovarAgendamento(@Res({ passthrough: true }) res: Response, @Param() params: { idAgendamento: string }) {

        return this.serviceAgenda.aprovarAgendamento(res, params.idAgendamento)
    }

    @Delete("/deletar/agendamento/recusado/cancelado/:idAgendamento")
    deletarAgendamento(@Res({ passthrough: true }) res: Response, @Param() params: { idAgendamento: string }) {

        return this.serviceAgenda.deletarAgendamento(res, params.idAgendamento)
    }

    @Get("/carregar/agendamento/dia/unico/detalhado/:idAgendamento")
    carregarAgendamentoDiaDetalhado(@Res({ passthrough: true }) res: Response, @Param() params: { idAgendamento: string }) {

        return this.serviceAgenda.carregarAgendamentoDiaDetalhado(res, params.idAgendamento)
    }

    @Post("/carregar/agendamentos/intervalo/dia")
    carregarAgendamentosDoDia(@Body() body: agendaDiaProps, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.carregarAgendamentosDoDia(body, res.locals.idUsuario)
    }

    @Post("/criar/novo/agendamento")
    criarAgendamento(@Body() body: diaAgendaType, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.criarNovoAgendamento(body, res.locals.idUsuario)
    }

    @Get("/carregar/total/agendamentos/dia/mes/:mes/:ano")
    carregarAgendamentosTotalDiaMes(@Param() params: { mes: string, ano: string }, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.carregaQtdAgendamentosMensal(params.mes, params.ano, res.locals.idUsuario)
    }
}
