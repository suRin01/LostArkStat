import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserServcie } from "../service/user.service";
import { Mapper } from "../mapper/mapper";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";

@Module({
	imports:[],
	controllers: [UserController],
	providers: [UserServcie, Mapper, LoginAuthFilter],
	exports: [UserServcie, Mapper]
})
export class UserModule {}
