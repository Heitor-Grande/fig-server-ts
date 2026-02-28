import { Body, Controller, Post } from '@nestjs/common';
import { InscricaopushService } from './inscricaopush.service';
import { incricaoPushBody } from 'src/types/globalTypes';

@Controller('inscricaopush')
export class InscricaopushController {
    constructor(private readonly incricaoPushService: InscricaopushService) {

    }

    @Post("/criar")
    criarInscricao(@Body() body: incricaoPushBody) {

        return this.incricaoPushService.criarIncricaoPush(body)
    }
}
