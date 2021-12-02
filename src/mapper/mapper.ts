import mysql from "mysql2/promise";
import "dotenv/config";

import { database } from "../util/db";
import { UserDTO, executionResult } from "../dto/user.dto";
import { WinstonLogger } from "../util/logger";
import { StatusCode } from "src/common/statusCode";

export class Mapper {
	constructor(private db: database) {
		this.db = new database();
		WinstonLogger.getInstance().info("Database connection created");
	}
	public mapper = async (query: string, data: string[] = []): Promise<executionResult> => {
		//Get database Connection
		const conn: mysql.PoolConnection | undefined = await this.db.getConnection();
		if (conn === undefined) {
			WinstonLogger.getInstance().error("database connection failed.");
			return { status: StatusCode.DbExecutionFail, data: [] };
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
		
		if (Array.isArray(result)) {
			for (let idx = 0, len = (result[0] as any[]).length; idx < len; idx++) {
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
					salt: tempResult.salt,
					is_deleted: tempResult.is_deleted,
				});
			}
			WinstonLogger.getInstance().info("Query execution success");
			return { status: StatusCode.OK, data: resultArr };
		} else if (result !== undefined) {
			WinstonLogger.getInstance().info("Query execution success with no returning data");
			return { status: StatusCode.OkNoReturnData, data: [] };
		} else {
			WinstonLogger.getInstance().error("Query execution failed");
			return { status: StatusCode.DbExecutionFail , data: [] };
		}
	};
}
