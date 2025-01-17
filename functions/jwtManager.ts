import { verify, sign } from "jsonwebtoken"
import { NextFunction, Request } from "express"
import { HttpException, HttpStatus } from "@nestjs/common"
//verifica jwt publico
function verificaJWT(req: Request, next: NextFunction) {
    try {
        verify(req.headers.authorization, process.env.JWT_KEY, function (erro) {
            if (erro) {
                throw new HttpException("Token Público Inválido", HttpStatus.UNAUTHORIZED)
            }
            else {
                next()
            }
        })
    } catch (error) {
        console.error('Erro ao verificar JWT público:', error)
        throw new HttpException('Erro ao verificar JWT público.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
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
export default {
    verificaJWT,
    criaJWT
}