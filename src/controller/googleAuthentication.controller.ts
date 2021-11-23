import { Controller, ClassSerializerInterceptor, UseInterceptors, Req, Get, Query, Res, Render } from "@nestjs/common";
import { GoogleAuthenticationService } from "../service/googleAuthentication.service";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config";
import { oauth2_v2 } from "googleapis";
import { UserServcie } from "src/service/user.service";
import { executionResult } from "src/dto/user.dto";
import { AuthService } from "src/service/auth.service";

@Controller("auth/google")
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
	constructor(private readonly googleAuthenticationService: GoogleAuthenticationService, private readonly userService: UserServcie, private readonly authService: AuthService) {}
	
	@Get("redirect")
	@Render("redirect")
	async login(@Res({ passthrough: true }) response, @Query("code") code: string){
		const result:OAuth2Client = await this.googleAuthenticationService.getAccessToken(code);

		const userProfile: oauth2_v2.Schema$Userinfo = await (await this.googleAuthenticationService.getUserProfile(result)).data;
		
		const findUser:executionResult = await this.userService.getUser(userProfile.id);

		if(findUser.data.length === 0){
			await this.userService.createOauthUser(userProfile);
		}

		const tokens = this.authService.getAccessToken({"username": userProfile.email, "userId": userProfile.id})
		
		response.cookie("Authorization", tokens.access_token, {
			httpOnly: true,
		})
		response.cookie("Refresh", tokens.refresh_token, {
			httpOnly: true,
		})

		return;
	}

}
