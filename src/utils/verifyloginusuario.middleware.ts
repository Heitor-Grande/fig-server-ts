import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { verify } from "jsonwebtoken"
@Injectable()
export class VerifyloginusuarioMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //esse token vem com infos do usuario como senha e email
    try {
    
      const id_usuario = req.params.idUsuario || req.params.id_usuario || req.body.id_usuario || req.body.idUsuario || req.query.idUsuario || req.headers.idusuario
      const decodificado: any = verify(req.headers.authorization, process.env.JWT_KEY_LOGIN)

      if (decodificado.idUsuario == id_usuario) {

        next()
      }
      else {

        throw new HttpException("Erro verificar token de login", HttpStatus.FORBIDDEN)
      }
    } catch (error) {

      throw new HttpException("Erro verificar token de login", HttpStatus.FORBIDDEN)
    }
  }
}
