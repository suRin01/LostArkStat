import { Get, Controller, Post, UseGuards, Res, Redirect, UseFilters, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import JwtToken from "src/model/jwt.token.model";
import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	loginPage(@Res() res: Response): void {
		res.status(200).redirect("/");

		return;
	}

	@UseGuards(AuthGuard("local"))
	@Redirect("/", 302)
	@Post()
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
		const tokens: JwtToken = await this.authService.getAccessToken({
			username: req.user["data"][0]["name"],
			sub: req.user["data"][0]["id"],
		});

		res.cookie("Authorization", tokens.access_token, {
			httpOnly: true,
		});
		res.cookie("Refresh", tokens.refresh_token, {
			httpOnly: true,
		});
		return;
	}

}
