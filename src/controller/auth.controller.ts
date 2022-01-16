import { Get, Controller, Post, UseGuards, Res, Redirect, UseFilters, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { StatusCode } from "src/common/statusCode";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { UserDTO } from "src/dto/user.dto";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import JwtToken from "src/model/jwt.token.model";
import { AuthService } from "../service/auth.service";

@Controller("api/auth")
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
	@Redirect("/", StatusCode.Redirect)
	@Post()
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
		const firstUserData: UserDTO = (req.user as ExecutionResult).data[0] as UserDTO;
		const tokens: JwtToken = await this.authService.getAccessToken({
			username: firstUserData.name,
			sub: firstUserData.id,
			idx: firstUserData.user_idx,
			mainCharacter: firstUserData.mainCharacter,
			guildName: firstUserData.guildName
		});
		

		res.cookie("Authorization", tokens.Authorization, {
			httpOnly: true,
		});
		res.cookie("Refresh", tokens.Refresh, {
			httpOnly: true,
		});
		return;
	}

	@Get("/logout")
	@Redirect("/", StatusCode.Redirect)
	logout(@Res() res: Response): void{
		res.cookie("Authorization", "", {
			httpOnly: true,
		});
		res.cookie("Refresh", "", {
			httpOnly: true,
		});
		return;
	}

}
