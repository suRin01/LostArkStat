import { Get, Controller, Post } from "@nestjs/common";
import { UserServcie } from "../service/user.service";


@Controller()
export class UserController {
	constructor(private readonly userService:UserServcie){}


	@Get()
	getUser(): string{
		return this.userService.getUser();
	}

	@Post()
	createUser(user:User): boolean{
		return this.userService.createUser(user);
	}

	

}