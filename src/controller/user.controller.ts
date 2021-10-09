import { Get, Controller, Post, Body, Param, Patch } from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { executionResult } from "../dto/user.dto";
import { createUserDTO } from "src/dto/createUser.dto";

@Controller("user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<executionResult> {
		return await this.userService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: createUserDTO): Promise<executionResult> {
		return await this.userService.createUser(user);
	}

	@Patch("/:id")
	async patchUser(
		@Param("id") user: createUserDTO,
	): Promise<executionResult> {
		await this.userService.deleteUser(user.id);

		return await this.userService.createUser(user);
	}
}
