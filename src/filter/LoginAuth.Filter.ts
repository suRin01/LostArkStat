import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import { UnauthorizedException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch(UnauthorizedException)
export class LoginAuthFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const context: HttpArgumentsHost = host.switchToHttp();
		const response: Response<any, Record<string, any>> = context.getResponse<Response>();
		const request: Request = context.getRequest<Request>();
		const status: number = exception.getStatus();

		if (request.url === "/auth") {
			response.render("login");
		} else if(request.url === "/") {
			response.render("index", {"isLogin":false})
		} else {
			response.status(status).redirect("/auth");
		}
	}
}
