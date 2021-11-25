import { Injectable } from "@nestjs/common";
import { google, Auth, oauth2_v2 } from "googleapis";
import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { GaxiosResponse } from "gaxios";

@Injectable()
export class GoogleAuthenticationService {
	oauthClient: Auth.OAuth2Client;

	async getAccessToken(token: string): Promise<OAuth2Client> {
		const clientID: string = process.env.GOOGLEOAUTHID;
		const clientSecret: string = process.env.GOOGLEOAUTHPASSWORD;
		const redirectUri: string = process.env.GOOGLEOAUTHREDIRECTURL;

		const oauth2Client: OAuth2Client = new OAuth2Client(clientID, clientSecret, redirectUri);

		google.options({ auth: oauth2Client });

		const tokens: GetTokenResponse = await oauth2Client.getToken(token);
		oauth2Client.credentials = tokens.tokens;

		return oauth2Client;
	}

	async getUserProfile(oauth2Client: OAuth2Client): Promise<GaxiosResponse<oauth2_v2.Schema$Userinfo>> {
		return await google.oauth2("v2").userinfo.get({
			auth: oauth2Client,
		});
	}
}
