import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import connection from 'database/connection';

@Injectable()
export class UsuarioService {
    async carregarUsuarioById(params: any) {
        try {
            const sqlSelectUsuario = `
            SELECT * FROM usuario
            WHERE id_usuario = $1
            `
            const sqlSelectUsuarioValues = [params.id_usuario]
            const usuario = (await connection.query(sqlSelectUsuario, sqlSelectUsuarioValues)).rows[0]
            return usuario
        } catch (error) {
            throw new HttpException("Erro ao carregar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //função para atualizar dados da conta
    async atualizarUsuarioById(params: any, body: any) {
        try {
            const sqlUpdateUsuario = `
            UPDATE usuario
                SET
                nome = $1,
                email= $2,
                avatar = $3
                WHERE id_usuario = $4
            `
            const sqlUpdateUsuarioValues = [body.inputsConta.nome, body.inputsConta.email, body.inputsConta.avatar, params.id_usuario]
            await connection.query(sqlUpdateUsuario, sqlUpdateUsuarioValues)
            return "Sucesso ao atualizar dados da conta."
        } catch (error) {
            console.log(error)
            throw new HttpException("Erro ao atualizar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
