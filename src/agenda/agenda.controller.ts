import { Body, Controller, Post, Res } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { diaAgendaType } from 'src/types/globalTypes';
import { Response } from 'express';

@Controller('agenda')
export class AgendaController {

    constructor(private readonly serviceAgenda: AgendaService) { }

    @Post("/criar/novo/agendamento")
    CriarAgendamento(@Body() body: diaAgendaType, @Res({ passthrough: true }) res: Response) {

        return this.serviceAgenda.criarNovoAgendamento(body, res.locals.idUsuario)
    }
}
