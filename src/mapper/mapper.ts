import mysql from "mysql2/promise";
import "dotenv/config";

import { database } from "../util/db";
import { UserDTO, executionResult } from "../dto/user.dto";

export class Mapper {
	constructor(private db: database) {
		this.db = new database();
		console.log("Database connection created");
	}
	public mapper = async (
		query: string,
		data: string[] = [],
	): Promise<executionResult> => {
		//Get database Connection
		const conn: mysql.PoolConnection | undefined =
			await this.db.getConnection();
		if (conn === undefined) {
			console.error("database connection failed.");
			return { status: 500, data: [] };
		}

		//Excute query
		const result:
			| void
			| [
					(
						| mysql.RowDataPacket[]
						| mysql.RowDataPacket[][]
						| mysql.OkPacket
						| mysql.OkPacket[]
						| mysql.ResultSetHeader
					),
					mysql.FieldPacket[],
			  ] = await conn.query(query, data).catch((err: Error) => {
			console.error("Query execution failed");
			console.error(err);
		});

		//Relase connection and return
		try {
			conn.release();
		} catch (err) {
			console.log(err);
		}

		const resultArr: Array<UserDTO> = [];
		//Return result
		if (Array.isArray(result)) {
			if (result !== undefined) {
				for (
					let idx = 0, len = (result[0] as any[]).length;
					idx < len;
					idx++
				) {
					const tempResult = (result[0] as any[])[idx];
					resultArr.push({
						idx: Number.parseInt(tempResult.idx),
						name: tempResult.name,
						id: tempResult.id,
						password: tempResult.password,
						phoneNumber: tempResult.phoneNumber,
						birthDate: tempResult.birthDate,
						gender: tempResult.gender,
						mainCharacter: tempResult.mainCharacter,
						timestamp: tempResult.timestamp,
					});
				}
			}
			console.log("Query execution success");
			return { status: 200, data: resultArr };
		} else if (result !== undefined) {
			console.log("Query execution success with no returning data");
			return { status: 200, data: [] };
		} else {
			console.error("Query execution failed");
			return { status: 500, data: [] };
		}
	};
}
