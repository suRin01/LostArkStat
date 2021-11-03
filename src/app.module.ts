import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { MainModule } from "./modules/main.module";
import { UserModule } from "./modules/user.module";

@Module({
	imports: [UserModule, AuthModule, MainModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
