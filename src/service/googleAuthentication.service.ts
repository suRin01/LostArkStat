import { Injectable } from "@nestjs/common";
import { google, Auth } from "googleapis";
import "dotenv/config";

@Injectable()
export class GoogleAuthenticationService {
	oauthClient: Auth.OAuth2Client;
	constructor() {
		const clientID = process.env.GOOGLEAUTHID;
		const clientSecret = process.env.GOOGLEAUTHPASSWORD;

		this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
	}

	async getUserData(token: string) {
		const userInfoClient = google.oauth2("v2").userinfo;
		console.log(token);

		this.oauthClient.setCredentials({
			access_token: token,
		});

		const userInfoResponse = await userInfoClient.get({
			auth: this.oauthClient,
		});

		return userInfoResponse.data;
	}

	// async getCookiesForUser(user: User) {
	// 	const accessTokenCookie = this.authService.getAccessToken(user.id);
	// 	const { cookie: refreshTokenCookie, token: refreshToken } =
	// 		this.authService.getCookieWithJwtRefreshToken(user.id);

	// 	await this.userService.setCurrentRefreshToken(refreshToken, user.id);

	// 	return {
	// 		accessTokenCookie,
	// 		refreshTokenCookie,
	// 	};
	// }

	// async handleRegisteredUser(user: User) {
	// 	if (!user.isRegisteredWithGoogle) {
	// 		throw new UnauthorizedException();
	// 	}

	// 	const { accessTokenCookie, refreshTokenCookie } = await this.getCookiesForUser(user);

	// 	return {
	// 		accessTokenCookie,
	// 		refreshTokenCookie,
	// 		user,
	// 	};
	// }

	// async registerUser(token: string, email: string) {
	// 	const userData = await this.getUserData(token);
	// 	const name = userData.name;

	// 	const user = await this.userService.createWithGoogle(email, name);

	// 	return this.handleRegisteredUser(user);
	// }

	// async authenticate(token: string) {
	// 	const tokenInfo = await this.oauthClient.getTokenInfo(token);

	// 	const email = tokenInfo.email;

	// 	try {
	// 		const user = await this.userService.getByEmail(email);

	// 		return this.handleRegisteredUser(user);
	// 	} catch (error) {
	// 		if (error.status !== 404) {
	// 			throw new error();
	// 		}

	// 		return this.registerUser(token, email);
	// 	}
	// }
}
