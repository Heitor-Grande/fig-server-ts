import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';
import { agendaDiaProps, diaAgendaType } from 'src/types/globalTypes';
import enviarEmail from 'src/utils/enviarEmail';
import notify from 'src/utils/notifyServiceWork';
import somenteNumeros from 'src/utils/somenteNumeros';
import { gerarHtmlAgendamentoAprovado, gerarHtmlAgendamentoFinalizado, htmlAgendamentoRecusado, htmlEmailAgendamentoRecebido, htmlEmailAguardandoAprovacao } from './htmlEmail';

@Injectable()
export class AgendaService {

    //finalizar agendamento
    async finalizarAgendamento(res: Response, idAgendamento: string) {

        try {

            const sqlUpdateAgendamento = `
            UPDATE public.agenda
            SET status = 'FINALIZADO'
            WHERE id_usuario = $1 
            AND idagendamento = $2
            RETURNING email,TO_CHAR(data_inicio::timestamp, 'DD/MM/YYYY HH24:MI:SS') as data_formatada
            `

            const info = (await connection.query(sqlUpdateAgendamento, [res.locals.idUsuario, idAgendamento])).rows[0]

            try {

                const html = gerarHtmlAgendamentoFinalizado(info.data_formatada)
                await enviarEmail(info.email, "Agendamento Finalizado", html)
            } catch (error) {

                console.log(error)
            }

            return {
                sucesso: true,
                msg: "Agendamento Finalizado com Sucesso."
            }
        } catch (error) {

            console.log(error)
            throw new InternalServerErrorException()
        }
    }

    //aprova o agendamento
    async aprovarAgendamento(res: Response, idAgendamento: string) {

        try {

            const sqlUpdateAgendamento = `
            UPDATE public.agenda
            SET status = 'APROVADO'
            WHERE id_usuario = $1 
            AND idagendamento = $2
            RETURNING email,TO_CHAR(data_inicio::timestamp, 'DD/MM/YYYY HH24:MI:SS') as data_formatada
            `

            const info = (await connection.query(sqlUpdateAgendamento, [res.locals.idUsuario, idAgendamento])).rows[0]

            try {

                const html = gerarHtmlAgendamentoAprovado(info.data_formatada)
                await enviarEmail(info.email, "Agendamento Aprovado", html)
            } catch (error) {

                console.log(error)
            }

            return {
                sucesso: true,
                msg: "Agendamento aprovado com Sucesso."
            }
        } catch (error) {

            console.log(error)
            throw new InternalServerErrorException()
        }
    }

    //deleta o agendamento recuso ou cancelado
    async deletarAgendamento(res: Response, idAgendamento: string) {

        try {

            const sqlDeleteAgendamento = `
            DELETE FROM public.agenda 
            WHERE id_usuario = $1 
            AND idagendamento = $2
            RETURNING email;
            `

            const info = await connection.query(sqlDeleteAgendamento, [res.locals.idUsuario, idAgendamento])

            try {
                await enviarEmail(info.rows[0].email, "Agendamento Recusado ou Cancelado", htmlAgendamentoRecusado)
            } catch (error) {

                console.log(error)
            }
            return {
                sucesso: true,
                msg: "Sucesso ao remover agendamento da sua Agenda."
            }
        } catch (error) {

            throw new InternalServerErrorException()
        }
    }

    //carregar agendamento unico detalhado
    async carregarAgendamentoDiaDetalhado(res: Response, idAgendamento: string) {

        try {

            const sqlSelectAgendamentoDetalhado = `
            SELECT 
            idagendamento, 
            data_inicio, 
            data_fim, 
            id_usuario, 
            observacao, 
            status, 
            data_criacao, data_aprovacao, cpf, nome_completo, celular, email
            FROM public.agenda where idagendamento = $1 and id_usuario = $2
            `

            const agendamento = (await connection.query(sqlSelectAgendamentoDetalhado, [idAgendamento, res.locals.idUsuario])).rows[0]

            if (agendamento) {

                return {
                    sucesso: true,
                    msg: "Agendamento encontrado com Sucesso.",
                    dado: agendamento
                }
            }
            else {

                throw new BadRequestException("Agendamento não Encontrado.")
            }
        } catch (error) {

            throw new InternalServerErrorException()
        }
    }

    //carrega os agendamentos do dia 
    async carregarAgendamentosDoDia(body: agendaDiaProps, idUsuario: string) {

        try {

            const sqlSelectAgendaDia = `
            SELECT 
            idagendamento, 
            data_inicio, 
            data_fim,
            status
            FROM public.agenda
            where data_inicio like '%' || $1 || '%' and id_usuario = $2
            `

            const dataInicio = `${body.ano}-${body.mes}-${body.dia}`
            const agendamentosDia = (await connection.query(sqlSelectAgendaDia, [dataInicio, idUsuario])).rows

            return {
                sucesso: true,
                dados: agendamentosDia,
                msg: "Sucesso ao carregar agenda do dia."
            }
        } catch (error) {

            throw new InternalServerErrorException()
        }
    }

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

            if (body.id == null || body.id == undefined) {

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
            SELECT i.inscricao, u.email FROM public.inscricaopushuser i
            INNER JOIN public.usuario u ON u.id_usuario = i.userid
            WHERE i.userid = $1
            `

            const inscricao = (await connection.query(inscricaoUsuario, [idUsuario])).rows[0]

            if (inscricao.inscricao) {

                notify(inscricao.inscricao, {
                    title: "Novo Agendamento Pendente de Aprovação.",
                    body: `Novo agendamento de ${body.nomeCompleto} para o dia ${body.dia}/${body.mes}`,
                    data: {
                        url: process.env.CLIENT + "/home/minha/agenda"
                    }
                })
            }

            try {

                //comunica o USUARIO que tem agendamento apra aprovar
                await enviarEmail(inscricao.email, "Agendamento - Aguardando Aprovação", htmlEmailAguardandoAprovacao)

                await enviarEmail(body.email, "Agendamento Solicitado - Aguardando Aprovação", htmlEmailAgendamentoRecebido)
            } catch (error) {

                console.log(error)
            }

            return {
                msg: `Agendamento criado com sucesso, Aguarde a confirmação.`,
                sucesso: true
            }
        } catch (error: any) {

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
