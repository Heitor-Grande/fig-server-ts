import { Module } from '@nestjs/common'
import { AutologinController } from './autologin.controller'
import { AutologinService } from './autologin.service'


@Module({
    providers: [AutologinService],
    controllers: [AutologinController]
})

export class AutologinModule {

}