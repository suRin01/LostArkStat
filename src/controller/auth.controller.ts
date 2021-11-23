import { Get, Controller, Post, Render, UseGuards, Request, Res, Redirect, UseFilters } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	loginPage(@Res() response) {
		response.status(200).redirect("/");

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

	@Get()
	async renewToken(@Request() req, @Res({ passthrough: true }) response) {

	}
}
