import { Module } from "@nestjs/common";
import { AutologinController } from "src/autologin/autologin.controller";
import { AutologinService } from "src/autologin/autologin.service";


@Module({
    providers: [AutologinService],
    controllers: [AutologinController]
})

export class cadContaModule {

}