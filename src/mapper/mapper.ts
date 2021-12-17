import mysql from "mysql2/promise";
import "dotenv/config";

import { database } from "../util/db";
import { UserDTO, executionResult } from "../dto/user.dto";
import { WinstonLogger } from "../util/logger";

export class Mapper {
	constructor(private db: database) {
		this.db = new database();
		WinstonLogger.getInstance().info("Database connection created");
	}
	public mapper = async (query: string, data: (string|number)[] = []): Promise<executionResult> => {
		//Get database Connection
		const conn: mysql.PoolConnection | undefined = await this.db.getConnection();
		if (conn === undefined) {
			WinstonLogger.getInstance().error("database connection failed.");
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
			WinstonLogger.getInstance().error("Query execution failed");
			WinstonLogger.getInstance().error(err);
		});

		//Relase connection and return
		try {
			conn.release();
		} catch (err) {
			WinstonLogger.getInstance().error(err);
		}

		const resultArr: Array<UserDTO> = [];
		//Return result
		if (Array.isArray(result)) {
			for (
				let idx = 0, len = (result[0] as any[]).length;
				idx < len;
				idx++
			) {
				const tempResult = (result[0] as any[])[idx];
				const keyArray = Object.getOwnPropertyNames(tempResult);
				const putValue: any = {};

				keyArray.forEach((element) => {
					putValue[element] = tempResult[element];
				});
				resultArr.push(putValue);
			}
			WinstonLogger.getInstance().info("Query execution success");
			return { status: 200, data: resultArr };
		} else if (result !== undefined) {
			WinstonLogger.getInstance().info("Query execution success with no returning data");
			return { status: 200, data: [] };
		} else {
			WinstonLogger.getInstance().error("Query execution failed");
			return { status: 500, data: [] };
		}
	};
}
