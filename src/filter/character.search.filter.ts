import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException, HttpException } from "@nestjs/common";
import { Response } from "express";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch(InternalServerErrorException)
export class CharacterSearchFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const context: HttpArgumentsHost = host.switchToHttp();
		const response: Response<any, Record<string, any>> = context.getResponse<Response>();
		
		response.render("index");
	}
}
