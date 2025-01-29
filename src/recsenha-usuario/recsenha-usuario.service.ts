import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import connection from 'database/connection';
import { verify } from "jsonwebtoken"
import gerarTokenRecSenha from './gerarTokenRecSenha';
import GerarPaginaHtml from './gerarHtmlEmail';
import { createTransport } from "nodemailer"
import hashManager from 'functions/hashManager';
interface tokenType {
    codigo: string
}
@Injectable()
export class RecsenhaUsuarioService {
    verificaTokenRecSenha(body: { token: string, codigo: string }) {
        try {
            const decodificado = verify(body.token, process.env.JWT_KEY) as tokenType
            if (decodificado.codigo == body.codigo) {
                return {
                    message: "Código válido."
                }
            }
        } catch (error) {
            throw new HttpException("Erro ao verificar token de recuparação", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async enviaEmailRecSenha(body: { email: string }) {
        try {
            //verifica se e-mail está cadastrado
            const SqlSelectUsuario = `
                select email from public.usuario
                WHERE
                email = $1
            `
            if ((await connection.query(SqlSelectUsuario, [body.email])).rows.length == 1) {
                //gerando codigo e token
                const codigo = (Math.random() * 100000).toString().split(".")[0]
                const token = gerarTokenRecSenha(codigo)
                //enviando e-mail
                const transporter = createTransport({
                    host: process.env.HOST_SMTP,
                    port: parseInt(process.env.PORT_SMTP),
                    secure: false,
                    auth: {
                        user: process.env.USER_SMTP,
                        pass: process.env.PASS_SMTP
                    }
                })
                await transporter.sendMail({
                    from: process.env.USER_SMTP,
                    to: body.email,
                    subject: "Recuperação de senha FIG.",
                    html: GerarPaginaHtml(codigo)
                })
                //resposta de sucesso
                return {
                    message: "E-mail de recuperação enviado.",
                    token: token
                }
            }
            else {
                //email nao encontrado
                throw new HttpException("E-mail não encontrado.", HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            throw new HttpException(error.response || "Erro ao verificar token de recuparação", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //atualiza a senha do usuario
    async atualizarSenhaLoginUsuario(body: { email: string, novaSenha: string }) {
        try {
            const SqlUpdateSenha = `
            UPDATE public.usuario
            SET
            senha = $1
            where email = $2
            `
            await connection.query(SqlUpdateSenha, [hashManager.gerarHash(body.novaSenha).infoHash, body.email])
            return {
                message: "Sucesso ao atualizar senha."
            }
        } catch (error) {
            throw new HttpException("Erro ao atualizar senha.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
