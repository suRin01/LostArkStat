import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, Req, Get, Query } from "@nestjs/common";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config";
import { GoogleApis, oauth2_v2 } from "googleapis";
import { GaxiosResponse } from "gaxios";

@Controller("auth/google")
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
	constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}
	@Get("redirect")
	async login(@Query("code") code: string) :Promise<OAuth2Client>{
		const result:OAuth2Client = await this.googleAuthenticationService.getAccessToken(code);

		const userProfile: GaxiosResponse<oauth2_v2.Schema$Userinfo> = await this.googleAuthenticationService.getUserProfile(result);

		console.debug(userProfile.data);
		return result;
	}

}
