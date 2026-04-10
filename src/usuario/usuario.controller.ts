import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    //carrega infos do usuario
    @Get("/carregar/usuario")
    carregarUsuario(@Param() params: any, @Res({ passthrough: true }) res: Response) {
        return this.usuarioService.carregarUsuarioById(res)
    }
    //atualiza conta do usuario
    @Put("/atualizar/minha/conta/:id_usuario")
    atualiarUsuario(@Param() params: any, @Body() body: any) {
        return this.usuarioService.atualizarUsuarioById(params, body)
    }
}
