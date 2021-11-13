import { Get, Controller, Post, Render, UseGuards, Request, Res, Redirect } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	// @Render("login")
	loginPage(@Res() response) {
		try {
			const result = AuthGuard("jwt");
			console.log(result);

			console.log("Authorlized");
			response.redirect("/");
		} catch (e) {
			return response.render("login");
		}
		return {};
	}

	@UseGuards(AuthGuard("local"))
	@Redirect("/", 302)
	@Post()
	async login(@Request() req, @Res({ passthrough: true }) response): Promise<any> {
		const tokens = await this.authService.getAccessToken({
			useranme: req.user.username,
			sub: req.user.userpw,
		});

		response.cookie("Authorization", tokens.access_token, {
			httpOnly: true,
		});
		response.cookie("Refresh", tokens.refresh_token, {
			httpOnly: true,
		});
		return;
	}

	// @UseGuards(AuthGuard("Jwt"))
	// @Get()
	// async renewToken(@Request() req, @Res({ passthrough: true }) response) {
	// 	const token = (
	// 		await this.authService.login({
	// 			useranme: req.user.username,
	// 			sub: req.user.userpw,
	// 		})
	// 	).access_token;
	// }
}
