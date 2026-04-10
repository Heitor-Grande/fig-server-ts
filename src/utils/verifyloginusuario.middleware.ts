import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from "jsonwebtoken"
@Injectable()
export class VerifyloginusuarioMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //esse token vem com infos do usuario como senha e email
    try {

      const decodificado = verify(req.headers.authorization, process.env.JWT_KEY_LOGIN) as {
        idUsuario: string
      }

      if (decodificado.idUsuario) {

        res.locals.idUsuario = decodificado.idUsuario
        next()
      }
      else {

        throw new HttpException("Token Inválido.", HttpStatus.FORBIDDEN)
      }
    } catch (error) {

      throw new HttpException("Faça o login novamente.", HttpStatus.FORBIDDEN)
    }
  }
}
