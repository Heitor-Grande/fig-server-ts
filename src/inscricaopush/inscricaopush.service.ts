import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';
import { incricaoPushBodyType } from 'src/types/globalTypes';

@Injectable()
export class InscricaopushService {

    async criarIncricaoPush(body: incricaoPushBodyType, res: Response) {

        try {

            const sqlDelete = `
            DELETE FROM public.inscricaopushuser where userid = $1
            `

            await connection.query(sqlDelete, [res.locals.idUsuario])

            const sqlInsert = `
                INSERT INTO public.inscricaopushuser
                (userid, inscricao)
                VALUES($1, $2)
            `

            await connection.query(sqlInsert, [res.locals.idUsuario, body.inscricao])

            return {
                msg: "Inscrição de Push do usuário criada com sucesso!",
                sucesso: true
            }

        } catch (error) {

            console.log(error)
            throw new InternalServerErrorException("Falha ao realizar Inscrição de Push do usuário.")
        }
    }
}
