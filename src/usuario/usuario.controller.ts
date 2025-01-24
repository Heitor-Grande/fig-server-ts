import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    @Get("/carregar/usuario/:id_usuario")
    carregarUsuario(@Param() params: any) {
        return this.usuarioService.carregarUsuarioById(params)
    }
}
