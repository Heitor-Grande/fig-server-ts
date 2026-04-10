import { Body, Controller, Post, Res } from '@nestjs/common';
import { InscricaopushService } from './inscricaopush.service';
import { incricaoPushBodyType } from 'src/types/globalTypes';
import { Response } from 'express';

@Controller('inscricaopush')
export class InscricaopushController {
    constructor(private readonly incricaoPushService: InscricaopushService) {

    }

    @Post("/criar")
    criarInscricao(@Body() body: incricaoPushBodyType, @Res({ passthrough: true }) res: Response) {

        console.log(res.locals)
        return this.incricaoPushService.criarIncricaoPush(body, res)
    }
}
