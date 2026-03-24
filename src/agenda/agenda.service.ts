import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';
import { diaAgendaType } from 'src/types/globalTypes';
import notify from 'src/utils/notifyServiceWork';
import somenteNumeros from 'src/utils/somenteNumeros';

@Injectable()
export class AgendaService {

    //cria novo agendamento
    async criarNovoAgendamento(body: diaAgendaType, idUsuario: string) {

        try {

            //verificar se a data para agendamento é anterior a data atual(hora local)
            const dataAtual = new Date(
                new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
            )

            const dataFormatadaAgendamento = `${body.ano}-${body.mes}-${body.dia}T${body.horaInicio}`;
            const dataAgendamento = new Date(new Date(dataFormatadaAgendamento).toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }))

            if (dataAgendamento < dataAtual) {

                throw new BadRequestException(
                    "Não é possível agendar em Data/Hora anterior ao atual."
                )
            }

            if (body.id === "novo") {

                const sqlInsertAgenda = `
            INSERT INTO public.agenda
            (
                data_inicio,
                data_fim,
                id_usuario,
                observacao,
                status,
                cpf,
                nome_completo,
                celular,
                email
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

                const dataInicio = `${body.ano}-${body.mes}-${body.dia}T${body.horaInicio}`
                const dataFim = `${body.ano}-${body.mes}-${body.dia}T${body.horaFim}`

                await connection.query(sqlInsertAgenda, [
                    dataInicio,
                    dataFim,
                    idUsuario,
                    body.observacao,
                    "PENDENTE",
                    somenteNumeros(body.cpf),
                    body.nomeCompleto,
                    somenteNumeros(body.celular),
                    body.email
                ])
            }
            else {

                throw new BadRequestException(
                    "Formatação incorreta de dados. Recarregue a página e tente novamente."
                )
            }

            //envia notificação de novo agendamento
            const inscricaoUsuario = `
            SELECT i.inscricao FROM public.inscricaopushuser i
            WHERE i.userid = $1
            `

            const inscricao = (await connection.query(inscricaoUsuario, [idUsuario])).rows[0].inscricao

            if (inscricao) {

                notify(inscricao, {
                    title: "Novo Agendamento Pendente de Aprovação.",
                    body: `Novo agendamento de ${body.nomeCompleto} para o dia ${body.dia}/${body.mes}`,
                    data: {
                        url: process.env.CLIENT + "/home/minha/agenda"
                    }
                })
            }
            return {
                msg: `Agendamento criado com sucesso, Aguarde a confirmação.`,
                sucesso: true
            }
        } catch (error) {

            console.log(error) 
            if (error instanceof BadRequestException) {

                throw error
            }

            if (error.code == "23505") {

                throw new BadRequestException("Já possuí agendamento nesse intervalo de Data e Hora.")
            }

            throw new InternalServerErrorException()
        }
    }

    //carrega a quantidade total de agendamentos por dia do mês selecionado
    async carregaQtdAgendamentosMensal(mes: string, ano: string, idUsuario: string) {

        try {

            const sqlSelect = `
           SELECT 
                id_usuario,
                EXTRACT(DAY FROM data_inicio::timestamp) as dia,
                EXTRACT(MONTH FROM data_inicio::timestamp) as mes,
                EXTRACT(YEAR FROM data_inicio::timestamp) as ano,
                count(EXTRACT(DAY FROM data_inicio::timestamp)) as qtd_total
            FROM public.agenda a
            where id_usuario = $1 
            and EXTRACT(MONTH FROM data_inicio::timestamp) = $2
            and EXTRACT(YEAR FROM data_inicio::timestamp) = $3
            group by id_usuario,
            EXTRACT(MONTH FROM data_inicio::timestamp),
            EXTRACT(YEAR FROM data_inicio::timestamp),
            EXTRACT(DAY FROM data_inicio::timestamp)
            `

            const agendamentos = await connection.query(sqlSelect, [idUsuario, mes, ano])

            return {
                msg: "Sucesso ao carregar Quantidade geral de Agendamentos por Dia",
                sucesso: true,
                dados: agendamentos.rows
            }
        } catch (error) {

            throw new InternalServerErrorException()
        }
    }
}
