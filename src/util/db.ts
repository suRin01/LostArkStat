import { createPool, Pool, PoolConnection } from "mysql2/promise";
import "dotenv/config";

export class database {
	private pool: Pool;
	constructor() {
		this.pool = createPool({
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			connectionLimit: 5,
		});

		this.pool.getConnection().catch((err: Error) => {
			console.log(err);
		});
		console.log("Mysql connection pool created.");
	}

	public getConnection = async (): Promise<PoolConnection | undefined> => {
		return await this.pool.getConnection().catch((err: Error) => {
			console.log("Mysql connection pool creation failed.");
			console.log(err);
			return undefined;
		});
	};
}
