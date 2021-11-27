import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch(InternalServerErrorException)
export class CharacterSearchFilter implements ExceptionFilter {
	catch(host: ArgumentsHost): void {
		const context: HttpArgumentsHost = host.switchToHttp();
		const response: Response<any, Record<string, any>> = context.getResponse<Response>();
		
		response.render("index");
	}
}
