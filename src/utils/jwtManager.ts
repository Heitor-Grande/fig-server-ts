import { sign } from "jsonwebtoken"
import { HttpException, HttpStatus } from "@nestjs/common"

//cria JTW para usuario que fez login
function criaJWTLogin(email: string, senha: string, idUsuario: string) {
    try {
        const token = sign({ emailLogado: email, senhaLogado: senha, idUsuario: idUsuario }, process.env.JWT_KEY_LOGIN, { expiresIn: "120h" })
        return token
    } catch (error) {
        throw new HttpException("Erro ao gerar token de Login", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
export default {

    criaJWTLogin
}