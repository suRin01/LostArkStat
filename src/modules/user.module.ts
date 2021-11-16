import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserServcie } from "../service/user.service";
import { Mapper } from "../mapper/mapper";
import { ViewAuthFilter } from "src/filter/ViewAuth.Filter";
import { LoggerService } from "src/service/logger.service";

@Module({
	controllers: [UserController],
	providers: [UserServcie, Mapper, ViewAuthFilter],
})
export class UserModule {}
