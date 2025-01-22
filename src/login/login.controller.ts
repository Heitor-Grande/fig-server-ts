import { Body, Controller, Post } from '@nestjs/common';
import { login } from './login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    @Post("/realizar/login")
    Login(@Body() login: login) {
        return this.loginService.fazerLogin(login)
    }
}
