import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LembreteType } from 'src/types/globalTypes';
import connection from 'src/database/connection';
import { Response } from 'express';

@Injectable()
export class LembreteService {

    async criarLembrete(body: LembreteType, res: Response) {

        const sqlInsert = `
            INSERT INTO public.lembretes
            (idusuario, lembrete, descricao, datadodisparo, recorrencia)
            VALUES($1, $2, $3, $4, $5)
        `

        await connection.query(sqlInsert, [res.locals.idUsuario, body.titulo, body.descricao, body.dataDoDisparo, body.recorrencia])

        return {
            msg: `Lembrete ${body.titulo} criado com sucesso!`,
            sucesso: true
        }
    }

    async carregarLembretes(res: Response) {

        const sqlSelectLembretes = `
            SELECT 
                idlembrete as id, 
                idusuario, 
                lembrete as titulo, 
                descricao, 
                datadodisparo as "dataDoDisparo", 
                recorrencia, 
                datacriacao as "dataCriacao",
                true as "readOnly",
                disparado
            FROM public.lembretes
            WHERE idusuario = $1
        `

        const lembretes = (await connection.query(sqlSelectLembretes, [res.locals.idUsuario])).rows as LembreteType[]

        return {
            msg: "Lembretes do usuário carregados com sucesso",
            lembretes: lembretes
        }
    }

    async atualizarLembrete(body: LembreteType, res: Response) {

        //verificar se a data para lembrete é anterior a data atual(hora local)
        const dataAtual = new Date(
            new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
        )

        const dataLembrete = new Date(
            new Date(body.dataDoDisparo).toLocaleString("en-US", {
                timeZone: "America/Sao_Paulo"
            })
        )

        if (dataLembrete < dataAtual) {

            throw new BadRequestException(
                "Não é possível agendar Lembrete em data passada."
            )
        }

        const sqlUpdate = `
        UPDATE public.lembretes
            SET lembrete=$1, descricao=$2, datadodisparo=$3, recorrencia=$4
        WHERE idlembrete=$5 and idusuario =$6;
        `

        await connection.query(sqlUpdate, [body.titulo, body.descricao, body.dataDoDisparo, body.recorrencia, body.id, res.locals.idUsuario])
        return {
            msg: "Lembrete Atualizado",
            sucesso: true
        }
    }

    async deletarLembrete(params: { idlembrete: string }, res: Response) {

        const sqlDelete = `
            DELETE FROM public.lembretes
            WHERE idlembrete=$1 AND idusuario = $2
        `

        await connection.query(sqlDelete, [params.idlembrete, res.locals.idUsuario])

        return {
            msg: "Lembrete removido com sucesso.",
            sucesso: true
        }
    }
}
