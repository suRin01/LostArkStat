import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";
import * as moment from "moment";
const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class WinstonLogger {
	// TODO : static / singleton 차이 포스팅 
	private static instance: winston.Logger;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}
	public static getInstance(): winston.Logger {
		if (this.instance) {
			return this.instance;
		}
		this.instance = winston.createLogger({
			format: combine(errors({ stack: true }), json(), timestamp({ format: "isoDateTime" }), ms(), prettyPrint()),
			transports: [
				new winston.transports.File({
					level: "error",
					filename: `error-${moment(new Date()).format("YYYY-MM-DD")}.log`,
					dirname: "logs",
					maxsize: 5000000,
				}),
				new winston.transports.Console({
					level: "debug",
					format: combine(nestWinstonModuleUtilities.format.nestLike()),
				}),

				new winston.transports.File({
					filename: `application-${moment(new Date()).format("YYYY-MM-DD")}.log`,
					dirname: "logs",
					maxsize: 5000000,
				}),
			],
		});

		console.log = (message: any, params?: any) => {
			this.instance.debug(message, params);
		};

		return this.instance;
	}
}
