import { Injectable, InternalServerErrorException } from '@nestjs/common';
import connection from 'src/database/connection';
import { incricaoPushBody } from 'src/types/globalTypes';

@Injectable()
export class InscricaopushService {

    async criarIncricaoPush(body: incricaoPushBody) {

        try {

            const sqlSelect = `
            DELETE FROM public.inscricaopushuser where userid = $1
            `
            
            await connection.query(sqlSelect, [body.idusuario])

            const sqlInsert = `
                INSERT INTO public.inscricaopushuser
                (userid, inscricao)
                VALUES($1, $2)
            `

            await connection.query(sqlInsert, [body.idusuario, body.inscricao])

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
