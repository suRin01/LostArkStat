import {
	Get,
	Controller,
	Post,
	Body,
	Param,
	Patch,
	Render,
	UseGuards,
	Request,
	Session,
	Res,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { session } from "passport";
import { AuthUserDto } from "../dto/auth.dto";
import { executionResult } from "../dto/user.dto";

import { AuthService } from "../service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@Render("login")
	async getUser() {
		return { message: "hi" };
	}

	@UseGuards(AuthGuard("local"))
	@Post()
	async login(
		@Request() req,
		@Res({ passthrough: true }) response,
	): Promise<any> {
		console.log(req.user);

		const token = (
			await this.authService.login({
				useranme: req.user.username,
				sub: req.user.userpw,
			})
		).access_token;

		response.setHeader("Set-Cookie", `Authorization=${token}; HttpOnly`);
		return token;
	}

	@UseGuards(AuthGuard("Jwt"))
	@Get()
	async renewToken(@Request() req, @Res({ passthrough: true }) response) {
		const token = (
			await this.authService.login({
				useranme: req.user.username,
				sub: req.user.userpw,
			})
		).access_token;
	}
}
