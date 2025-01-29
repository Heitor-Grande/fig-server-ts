import { Controller, Body, Post, Put } from '@nestjs/common';
import { RecsenhaUsuarioService } from './recsenha-usuario.service';
@Controller('recsenha-usuario')
export class RecsenhaUsuarioController {
    constructor(private readonly recSenhaUsuarioService: RecsenhaUsuarioService) { }
    @Post("/validar/codigo/recuperacao")
    verificaTokenRecSenha(@Body() body: { token: string, codigo: string }) {
        return this.recSenhaUsuarioService.verificaTokenRecSenha(body)
    }
    @Post("/enviar/email/recuperacao/senha")
    enviarEmailRecSenha(@Body() body: { email: string }) {
        return this.recSenhaUsuarioService.enviaEmailRecSenha(body)
    }
    @Put("/recupera/senha/usuario")
    atualizarSenhaLoginUsuario(@Body() body: { email: string, novaSenha: string }) {
        return this.recSenhaUsuarioService.atualizarSenhaLoginUsuario(body)
    }
}
