import { Injectable } from '@nestjs/common';
import { LembreteType } from 'src/types/globalTypes';
import connection from 'src/database/connection';

@Injectable()
export class LembreteService {

    async criarLembrete(body: LembreteType) {

        const sqlInsert = `
            INSERT INTO public.lembretes
            (idusuario, lembrete, descricao, datadodisparo, recorrencia)
            VALUES($1, $2, $3, $4, $5)
        `

        await connection.query(sqlInsert, [body.idusuario, body.titulo, body.descricao, body.dataDoDisparo, body.recorrencia])

        return {
            msg: `Lembrete ${body.titulo} criado com sucesso!`,
            sucesso: true
        }
    }

    async carregarLembretes(params: { idusuario: string }) {

        const sqlSelectLembretes = `
            SELECT 
                idlembrete as id, 
                idusuario, 
                lembrete as titulo, 
                descricao, 
                datadodisparo as "dataDoDisparo", 
                recorrencia, 
                datacriacao as "dataCriacao",
                true as "readOnly"
            FROM public.lembretes
            WHERE idusuario = $1
        `

        const lembretes = (await connection.query(sqlSelectLembretes, [params.idusuario])).rows as LembreteType[]

        return {
            msg: "Lembretes do usuário carregados com sucesso",
            lembretes: lembretes
        }
    }

    async atualizarLembrete(body: LembreteType) {

        const sqlUpdate = `
        UPDATE public.lembretes
            SET lembrete=$1, descricao=$2, datadodisparo=$3, recorrencia=$4
        WHERE idlembrete=$5 and idusuario =$6;
        `

        await connection.query(sqlUpdate, [body.titulo, body.descricao, body.dataDoDisparo, body.recorrencia, body.id, body.idusuario])
        return {
            msg: "Lembrete Atualizado",
            sucesso: true
        }
    }

    async deletarLembrete(params: { idlembrete: string, idusuario: string }) {

        const sqlDelete = `
            DELETE FROM public.lembretes
            WHERE idlembrete=$1 AND idusuario = $2
        `

        await connection.query(sqlDelete, [params.idlembrete, params.idusuario])

        return {
            msg: "Lembrete removido com sucesso.",
            sucesso: true
        }
    }
}
