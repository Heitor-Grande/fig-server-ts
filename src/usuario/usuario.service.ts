import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import connection from 'src/database/connection';

@Injectable()
export class UsuarioService {
    async carregarUsuarioById(res: Response) {
        try {
            const sqlSelectUsuario = `
            SELECT * FROM usuario
            WHERE id_usuario = $1
            `
            const sqlSelectUsuarioValues = [res.locals.idUsuario]
            const usuario = (await connection.query(sqlSelectUsuario, sqlSelectUsuarioValues)).rows[0]
            return usuario
        } catch (error) {
            throw new HttpException("Erro ao carregar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //função para atualizar dados da conta
    async atualizarUsuarioById(res: Response, body: any) {
        try {
            const sqlUpdateUsuario = `
            UPDATE usuario
                SET
                nome = $1,
                email= $2,
                avatar = $3
                WHERE id_usuario = $4
            `
            const sqlUpdateUsuarioValues = [body.inputsConta.nome, body.inputsConta.email, body.inputsConta.avatar, res.locals.idUsuario]
            await connection.query(sqlUpdateUsuario, sqlUpdateUsuarioValues)
            return "Sucesso ao atualizar dados da conta."
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao atualizar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
