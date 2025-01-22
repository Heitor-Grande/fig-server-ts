import { sign } from "jsonwebtoken"
import { HttpException, HttpStatus } from "@nestjs/common"

//cria JWT publico
async function criaJWT() {
    try {
        const token = sign({ user_id: 0 }, process.env.JWT_KEY, { expiresIn: "2h" })
        return token
    } catch (error) {
        console.log(error)
        throw new HttpException("Erro ao criar novo JWT publico", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
//cria JTW para usuario que fez login
async function criaJWTLogin(email: string, senha: string, idUsuario: string) {
    sign({ emailLogado: email, senhaLogado: senha, idUsuario: idUsuario }, process.env.JWT_KEY_LOGIN, { expiresIn: "120h" }, function (erro, token) {
        if (erro) {
            throw new HttpException("Erro ao gerar token de Login", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        else {
            return token
        }
    })
}
export default {
    criaJWT,
    criaJWTLogin
}