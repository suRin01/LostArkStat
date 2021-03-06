import mysql from "mysql2/promise";
import "dotenv/config";

import { database } from "../util/db";
import { UserDTO } from "../dto/user.dto";
import { WinstonLogger } from "../util/logger";
import { StatusCode } from "../common/statusCode";
import { ExecutionResult } from "src/dto/executionResult.dto";

export class Mapper {
	constructor(private db: database) {
		this.db = new database();
		WinstonLogger.getInstance().info("Database connection created");
	}
	public mapper = async (query: string, data: (string|number|Date)[] = []): Promise<ExecutionResult> => {
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
		
		if (Array.isArray(result) && result[1] !== undefined) {
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
			return { status: StatusCode.OK, data: resultArr};
		} else if (result[1] === undefined) {
			WinstonLogger.getInstance().info("Query execution success with no returning data");
			return { status: StatusCode.OkNoReturnData, data: [] , affectedRow: result[0].insertId };
		} else {
			WinstonLogger.getInstance().error("Query execution failed");
			return { status: StatusCode.DbExecutionFail , data: [] };
		}
	};
}
