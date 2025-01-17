import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import tokens from "../../functions/jwtManager"

@Injectable()
export class PublicService {
    gerarJWTpublic() {
        try {
            const token = tokens.criaJWT()
            return token
        } catch (error) {
            throw new HttpException(error.response || "Erro inesperado ao gerar token public", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
