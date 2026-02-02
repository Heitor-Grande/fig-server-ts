import { Module } from "@nestjs/common";
import { VerificaLoginController } from "./verifica-login.controller";
import { VerificaLoginService } from "./verifica-login.service";

@Module({
    providers: [VerificaLoginService],
    controllers: [VerificaLoginController]
})

export class VerificaLoginModule {

}