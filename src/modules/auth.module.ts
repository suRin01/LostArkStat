import { Module } from "@nestjs/common";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { Mapper } from "../mapper/mapper";
import { LocalStrategy } from "../strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserServcie } from "src/service/user.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy/jwt.strategy";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWTSECRET,
			signOptions: { expiresIn: "5m" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserServcie, Mapper, LocalStrategy, JwtStrategy],
	exports: [JwtModule, AuthService]
})
export class AuthModule {}
