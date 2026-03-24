import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';
import { diaAgendaType } from 'src/types/globalTypes';
import somenteNumeros from 'src/utils/somenteNumeros';

@Injectable()
export class AgendaService {

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

            return {
                msg: `Agendameno criado com sucesso, Aguarde a confirmação.`,
                sucesso: true
            }
        } catch (error) {


            if (error instanceof BadRequestException) {

                throw error
            }

            if (error.code == "23505") {

                throw new BadRequestException("Já possuí agendamento nesse intervalo de Data e Hora.")
            }

            throw new InternalServerErrorException()
        }
    }
}
