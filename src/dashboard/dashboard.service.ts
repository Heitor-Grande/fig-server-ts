import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';

@Injectable()
export class DashboardService {
    async carregarDashboardsUsuario(res: Response, body: { dataInicio: string, dataFim: string }) {
        try {
            //Carrega os movimentos, apenas totais
            const SqlSelectTotaisMovimentos = `
                SELECT 
                    SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) AS totalentrada,
                    SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) AS totalsaida
                FROM 
                public.movimentos
                WHERE id_usuario = $1 
                and datamovimento >= $2 
                and datamovimento <= $3
            `
            const sqlSelectTotaisMovimentosValues = [res.locals.idUsuario, body.dataInicio, body.dataFim]
            const movimentosTotalizados = (await connection.query(SqlSelectTotaisMovimentos, sqlSelectTotaisMovimentosValues)).rows[0]
            return {
                movimentosTotalizados: movimentosTotalizados
            }
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao carregar Dados para alimentar Gráficos.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
