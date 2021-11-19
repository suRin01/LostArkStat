import { Controller, Post, ClassSerializerInterceptor, UseInterceptors, Body, Req, Get, Query } from "@nestjs/common";
import TokenVerificationDto from "../dto/toeknVerification.dto";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";
import { Request } from "express";

@Controller("auth/google")
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
	constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}
	@Get("redirect")
	register(@Query("code") code: string) {
		console.log(code);
		const result = this.googleAuthenticationService.getUserData(code);

		return result;
	}

	@Post()
	async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
		// const { accessTokenCookie, refreshTokenCookie, user } = await this.googleAuthenticationService.authenticate(
		// 	tokenData.token,
		// );
		// request.res.setHeader("Set-Cookie", [accessTokenCookie, refreshTokenCookie]);
		// return user;
	}
}
