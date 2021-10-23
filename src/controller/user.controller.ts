import {
	Get,
	Controller,
	Post,
	Body,
	Param,
	Patch,
	UseGuards,
} from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { executionResult } from "../dto/user.dto";
import { createUserDTO } from "../dto/createUser.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/:id")
	async getUser(@Param("id") id: string): Promise<executionResult> {
		console.log(await this.userService.getUser(id));
		return await this.userService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: createUserDTO): Promise<executionResult> {
		return await this.userService.createUser(user);
	}

	@UseGuards(AuthGuard("jwt"))
	@Patch("/:id")
	async patchUser(
		@Param("id") user: createUserDTO,
	): Promise<executionResult> {
		await this.userService.deleteUser(user.id);

		return await this.userService.createUser(user);
	}
}
