//função criada para gerar o token que vai guardar o codigo gerado
import { HttpException, HttpStatus } from "@nestjs/common"
import { sign } from "jsonwebtoken"
function gerarTokenRecSenha(codigo: string) {
    try {
        const token = sign({ codigo: codigo }, process.env.JWT_KEY, { expiresIn: "2h" })
        return token
    } catch (error) {
        throw new HttpException("Erro ao gerar token de confirmação", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
export default gerarTokenRecSenha