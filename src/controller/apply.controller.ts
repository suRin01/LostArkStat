import {
	Controller,
	Req,
	UseGuards,
	Post,
	Delete,
	Param,
	Body,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Applicant } from "../model/applicant.model";
import jwtPayload from "../model/jwt.payload.model";
import JwtToken from "../model/jwt.token.model";
import { ApplyService } from "../service/apply.service";
import { RequestUtility } from "../util/req.util";

@Controller("api/apply")
export class ApplyController {
	constructor(private readonly applyService: ApplyService) {}

	@Post("/:postId")
	@UseGuards(AuthGuard("jwt"))
	appendApply(
		@Req() req :Request,
		@Body() applicant: Applicant,
		@Param("postId") postId: number,
	): void {
		const cookie:JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwt: jwtPayload = RequestUtility.parseJwt(cookie.Authorization)

		this.applyService.appendApplicant(postId, Number(jwt.idx), applicant.applicantClass, applicant.applicantId);
	}

	@Delete("/:postId")
	@UseGuards(AuthGuard("jwt"))
	deleteApply(@Req() req :Request, @Param("postId") postId: number): void {
		const cookie:JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwt: jwtPayload = RequestUtility.parseJwt(cookie.Authorization);

		this.applyService.deleteApplicant(Number(postId), Number(jwt.sub));
	}
}
