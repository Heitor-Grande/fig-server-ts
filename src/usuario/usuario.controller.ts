import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    //carrega infos do usuario
    @Get("/carregar/usuario")
    carregarUsuario(@Res({ passthrough: true }) res: Response) {
        return this.usuarioService.carregarUsuarioById(res)
    }
    //atualiza conta do usuario
    @Put("/atualizar/minha/conta")
    atualiarUsuario(@Res({ passthrough: true }) res: Response, @Body() body: any) {
        return this.usuarioService.atualizarUsuarioById(res, body)
    }
}
