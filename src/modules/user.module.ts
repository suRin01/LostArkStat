import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserServcie } from "../service/user.service";
import { Mapper } from "../mapper/mapper";

@Module({
	controllers: [UserController],
	providers: [UserServcie, Mapper],
})
export class UserModule {}
