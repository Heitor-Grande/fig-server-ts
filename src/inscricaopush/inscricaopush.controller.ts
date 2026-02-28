import { Body, Controller, Post } from '@nestjs/common';
import { InscricaopushService } from './inscricaopush.service';
import { incricaoPushBodyType } from 'src/types/globalTypes';

@Controller('inscricaopush')
export class InscricaopushController {
    constructor(private readonly incricaoPushService: InscricaopushService) {

    }

    @Post("/criar")
    criarInscricao(@Body() body: incricaoPushBodyType) {

        return this.incricaoPushService.criarIncricaoPush(body)
    }
}
