import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServcie {
	getUser(id: string): string {
		return "return user "+id;
	}
	createUser(user:User): boolean{
		console.log(user.id);
		return true;
	}
}
