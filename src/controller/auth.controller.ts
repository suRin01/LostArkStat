import {
	Get,
	Controller,
	Post,
	Body,
	Param,
	Patch,
	Render,
} from "@nestjs/common";
import { AuthUserDto } from "src/dto/auth.dto";
import { executionResult } from "src/dto/user.dto";

import { AuthService } from "src/service/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	@Render("login")
	async getUser() {
		return { message: "hi" };
	}

	// @Get("/:id")
	// async getUser(@Param("id") id: string): Promise<executionResult> {
	// 	return await this.userService.getUser(id);
	// }

	@Post()
	async login(@Body() user: AuthUserDto): Promise<boolean> {
		console.log(user);
		return await this.authService.login(user);
	}

	// @Patch("/:id")
	// async patchUser(
	// 	@Param("id") user: createUserDTO,
	// ): Promise<executionResult> {
	// 	await this.userService.deleteUser(user.id);

	// 	return await this.userService.createUser(user);
	// }
}
