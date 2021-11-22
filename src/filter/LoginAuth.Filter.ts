import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import { UnauthorizedException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch(UnauthorizedException)
export class LoginAuthFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context:HttpArgumentsHost = host.switchToHttp();
		const response:Response<any, Record<string, any>> = context.getResponse<Response>();
		const status = exception.getStatus();

		response.render("login");
	}
}
