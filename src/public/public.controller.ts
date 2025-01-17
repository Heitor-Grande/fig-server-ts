import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) { }
    //rota para gerar token public
    @Get("/criar/novo/jwt/public")
    criarNovoJwtPublic() {
        return this.publicService.gerarJWTpublic()
    }
}
