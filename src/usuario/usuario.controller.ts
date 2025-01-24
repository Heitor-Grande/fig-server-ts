import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    //carrega infos do usuario
    @Get("/carregar/usuario/:id_usuario")
    carregarUsuario(@Param() params: any) {
        return this.usuarioService.carregarUsuarioById(params)
    }
    //atualiza conta do usuario
    @Put("/atualizar/minha/conta/:id_usuario")
    atualiarUsuario(@Param() params: any, @Body() body: any) {
        return this.usuarioService.atualizarUsuarioById(params, body)
    }
}
