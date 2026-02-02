import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { cadContaDto } from './cad-conta.dto';
import connection from 'src/database/connection';
import hashManager from 'src/utils/hashManager';
@Injectable()
export class CadContaService {
    async cadastrarUsuario(conta: cadContaDto) {
        try {
            const sqlInsertUsuario = `
            INSERT INTO public.usuario
                (nome, senha, email)
                VALUES($1, $2, $3)
            `
            const hashSenha = hashManager.gerarHash(conta.senha).infoHash
            const sqlInsertUsuarioValues = [conta.nome, hashSenha, conta.email]
            await connection.query(sqlInsertUsuario, sqlInsertUsuarioValues)
            return 'Conta criada com sucesso!'
        } catch (error) {
            if (error.code == '23505') {
                throw new HttpException("E-mail já cadastrado, faça a recuperação de senha.", HttpStatus.CONFLICT)
            }
            else {
                throw new HttpException(error.response || "Erro inesperado criar conta.", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
