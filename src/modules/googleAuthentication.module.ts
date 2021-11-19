import { Module } from "@nestjs/common";
import { GoogleAuthenticationController } from "../controller/googleAuthentication.controller";
// import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user.module";
import { AuthModule } from "./auth.module";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";

@Module({
	imports: [UserModule, AuthModule],
	providers: [GoogleAuthenticationService],
	controllers: [GoogleAuthenticationController],
	exports: [],
})
export class GoogleAuthenticationModule {}
