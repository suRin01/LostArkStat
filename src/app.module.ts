import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { GoogleAuthenticationModule } from "./modules/googleAuthentication.module";
import { MainModule } from "./modules/main.module";
import { UserModule } from "./modules/user.module";
import "dotenv/config";

@Module({
	imports: [UserModule, AuthModule, MainModule, GoogleAuthenticationModule,],
	controllers: [],
	providers: [],
})
export class AppModule {}
