import { Module } from "@nestjs/common";
import { GoogleAuthenticationController } from "../controller/googleAuthentication.controller";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";
import { GoogleApis } from "googleapis";
import { UserModule } from "./user.module";
import { AuthModule } from "./auth.module";

@Module({
	imports: [UserModule, AuthModule],
	providers: [GoogleAuthenticationService, GoogleApis],
	controllers: [GoogleAuthenticationController],
	exports: [],
})
export class GoogleAuthenticationModule {}
