import { Body, Controller, Post, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashBoardService: DashboardService) { }
    @Post("/carregar/dashboard/principal/:id_usuario")
    CarregarDashboardsUsuario(@Param() params: { id_usuario: string }, @Body() body: { dataInicio: string, dataFim: string }) {
        return this.dashBoardService.carregarDashboardsUsuario(params, body)
    }
}
