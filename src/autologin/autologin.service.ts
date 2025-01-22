import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { verify } from "jsonwebtoken"
@Injectable()
export class AutologinService {
    autoLogin(req: Request) {
        try {
            const decodificado: any = verify(req.headers.authorization, process.env.JWT_KEY_LOGIN)
            return {
                idUsuario: decodificado.idUsuario
            }
        } catch (error) {
            throw new HttpException("Token inválido", HttpStatus.UNAUTHORIZED)
        }
    }
}
