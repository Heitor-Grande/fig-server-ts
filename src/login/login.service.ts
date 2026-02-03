import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { login } from './login.dto';
import connection from 'src/database/connection';
import hashManager from 'src/utils/hashManager';
import jwtManager from 'src/utils/jwtManager';
@Injectable()
export class LoginService {
    //função para fazer o login de fato
    async fazerLogin(login: login) {
        try {
            const sqlSelectUsuario = `SELECT email, senha, id_usuario, ativo  FROM usuario WHERE email = $1`
            const sqlValuesUsuario = [login.email]
            const usuarioEncontrado = (await connection.query(sqlSelectUsuario, sqlValuesUsuario)).rows
            if (usuarioEncontrado.length == 1) {
                const validado = hashManager.validarHash(login.senha, usuarioEncontrado[0].senha)
                if (validado == true) {
                    if (usuarioEncontrado[0].ativo == true) {
                        const tokenLogin = jwtManager.criaJWTLogin(login.email, login.senha, usuarioEncontrado[0].id_usuario)
                        return {
                            message: "Sucesso ao realizar login",
                            tokenLogin: tokenLogin,
                            usuario: usuarioEncontrado[0]
                        }
                    }
                    else {
                        throw new HttpException("Usuário não está ativo, contate o suporte.", HttpStatus.NOT_ACCEPTABLE)
                    }
                }
                else {
                    throw new HttpException("Senha e/ou E-mail inválido(s)", HttpStatus.NOT_ACCEPTABLE)
                }
            }
            else {
                throw new HttpException("Senha e/ou E-mail inválido(s)", HttpStatus.NOT_ACCEPTABLE)
            }
        } catch (error) {

            console.log(error)
           throw new HttpException(error.response || "Um erro inesperado ocorreu durante o Login", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
