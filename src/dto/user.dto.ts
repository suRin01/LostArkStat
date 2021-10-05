export class UserDTO {
	idx: number;
	name: string;
	id: string;
	password: string;
	phoneNumber: string;
	birthDate: Date;
	gender: string;
	mainCharacter: string;
	timestamp: Date;
}

export class executionResult {
	status: number;
	data: Array<UserDTO>;
}
