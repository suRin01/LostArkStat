import { Get, Controller, Post, Query } from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { executionResult, UserDTO } from "../dto/user.dto";

@Controller("user")
export class UserController {
	constructor(private userService: UserServcie) {}

	@Get()
	async getUser(@Query("id") id: string): Promise<executionResult> {
		return await this.userService.getUser(id);
	}

	// @Post()
	// createUser(user: UserDTO): boolean {
	// 	return this.userService.createUser(user);
	// }
}
