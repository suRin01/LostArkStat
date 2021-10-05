import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserServcie } from "../service/user.service";

@Module({
	controllers: [UserController],
	providers: [UserServcie],
})
export class UserModule {}