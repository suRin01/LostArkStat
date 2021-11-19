export default class User {
	public id: number;

	public email: string;

	public phoneNumber?: string;

	public name: string;

	public password?: string;

	public isRegisteredWithGoogle: boolean;

	public currentHashedRefreshToken?: string;

	public isEmailConfirmed: boolean;
}
