import { Controller, Get} from '@nestjs/common';
import { VerificaLoginService } from './verifica-login.service';

@Controller('verifica')
export class VerificaLoginController {
    constructor(private readonly verificaLoginService: VerificaLoginService) { }
    @Get("/login/usuario/:id_usuario")
    verificaLoginUsuario() {
        return this.verificaLoginService.verificaLogin()
    }
}
