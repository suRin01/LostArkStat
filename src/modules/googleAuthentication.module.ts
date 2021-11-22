import { Module } from "@nestjs/common";
import { GoogleAuthenticationController } from "../controller/googleAuthentication.controller";
import { UserModule } from "./user.module";
import { AuthModule } from "./auth.module";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";
import { GoogleApis } from "googleapis";

@Module({
	imports: [UserModule, AuthModule],
	providers: [GoogleAuthenticationService, GoogleApis],
	controllers: [GoogleAuthenticationController],
	exports: [],
})
export class GoogleAuthenticationModule {}
