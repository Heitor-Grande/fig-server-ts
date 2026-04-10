import { Body, Controller, Post, Param, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from 'express';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashBoardService: DashboardService) { }
    @Post("/carregar/dashboard/principal")
    CarregarDashboardsUsuario(@Res({ passthrough: true }) res: Response, @Body() body: { dataInicio: string, dataFim: string }) {
        return this.dashBoardService.carregarDashboardsUsuario(res, body)
    }
}
