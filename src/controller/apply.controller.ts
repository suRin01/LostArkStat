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
import { Applicant } from "src/model/applicant.model";
import jwtPayload from "src/model/jwt.payload.model";
import JwtToken from "src/model/jwt.token.model";
import { ApplyService } from "src/service/apply.service";
import { RequestUtility } from "src/util/req.util";

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
