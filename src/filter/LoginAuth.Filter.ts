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
		const request:Request = context.getRequest<Request>();
		const status = exception.getStatus();
		
		if(request.url === "/auth"){
			response.render("login");
		}
		else{
			response.status(status).redirect("/auth");
		}
		
	}
}
