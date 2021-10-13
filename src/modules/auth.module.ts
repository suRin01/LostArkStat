import { Module } from "@nestjs/common";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { Mapper } from "src/mapper/mapper";

@Module({
	controllers: [AuthController],
	providers: [AuthService, Mapper],
})
export class AuthModule {}
