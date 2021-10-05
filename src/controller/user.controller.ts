import { Get, Controller, Post, Param } from "@nestjs/common";
import { UserServcie } from "../service/user.service";

import { UserDTO } from "../dto/user.interface";

@Controller("user")
export class UserController {
	constructor(private readonly userService:UserServcie){}


	@Get()
	getUser(@Param("id") id: string): string{
		return this.userService.getUser(id);
	}

	@Post()
	createUser(user:UserDTO): boolean{
		return this.userService.createUser(user);
	}

}
