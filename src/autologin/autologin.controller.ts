import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AutologinService } from './autologin.service';

@Controller('autologin')
export class AutologinController {
    constructor(private readonly autologinService: AutologinService) { }
    @Get("/logar/login/usuario")
    autoLogin(@Req() req: Request) {
        return this.autologinService.autoLogin(req)
    }
}
