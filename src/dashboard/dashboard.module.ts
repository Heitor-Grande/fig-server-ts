import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { VerifyloginusuarioMiddleware } from "src/utils/verifyloginusuario.middleware";

@Module({
    providers: [DashboardService],
    controllers: [DashboardController]
})

export class DashboardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(VerifyloginusuarioMiddleware).forRoutes(DashboardController)
    }
}