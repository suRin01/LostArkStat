import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServcie {
	getUser(): string {
		return "Hello World!";
	}
	createUser(user:User): boolean{
		console.log(user.id);
		return true;
	}
}
