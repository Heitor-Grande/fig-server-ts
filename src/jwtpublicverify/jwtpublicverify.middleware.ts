import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from "jsonwebtoken"
@Injectable()
export class JwtpublicverifyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      verify(req.headers.authorization, process.env.JWT_KEY)
      next()
    } catch (error) {
      throw new HttpException("Token Público Inválido", HttpStatus.UNAUTHORIZED)
    }
  }
}
