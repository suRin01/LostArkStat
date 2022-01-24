import { Get, Controller, Post, Body, Param, Patch, UseGuards, UseFilters, Redirect } from "@nestjs/common";
import { UserServcie } from "../service/user.service";
import { createUserDTO } from "../dto/createUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginAuthFilter } from "../filter/LoginAuth.Filter";
import { ExecutionResult } from "../dto/executionResult.dto";

@Controller("api/user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<ExecutionResult> {
		return await this.userService.getUser(id);
	}



	// @Redirect("/")
	@Post()
	async createUser(@Body() user: createUserDTO): Promise<ExecutionResult> {
		return await this.userService.createUser(user);
	}

	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	@Patch("/:id")
	async patchUser(@Param("id") user: createUserDTO): Promise<ExecutionResult> {
		await this.userService.deleteUser(user.id);

		return await this.userService.createUser(user);
	}
}
