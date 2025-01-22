import { Controller, Get, Param } from '@nestjs/common';
import { VerificaLoginService } from './verifica-login.service';

@Controller('verifica-login')
export class VerificaLoginController {
    constructor(private readonly verificaLoginService: VerificaLoginService) { }
    @Get("/logar/login/usuario")
    verificaLoginUsuario() {
        return this.verificaLoginService.verificaLogin()
    }
}
