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
}
