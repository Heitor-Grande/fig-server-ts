import { Body, Controller, Post } from '@nestjs/common';
import { CadContaService } from './cad-conta.service';
import { cadContaDto } from './cad-conta.dto';

@Controller('cad-conta')
export class CadContaController {
    constructor(private readonly cadContaService: CadContaService) { }
    @Post("/criar/novo/precad")
    cadastrarUsuario(@Body() conta: cadContaDto) {
        return this.cadContaService.cadastrarUsuario(conta)
    }
}
