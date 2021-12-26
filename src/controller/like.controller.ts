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
import { ApplyService } from "src/service/apply.service";
import { RequestUtility } from "src/util/req.util";

@Controller("api/apply")
export class LikeController {
	constructor(private readonly applyService: ApplyService) {}
	@Post("/:postId")
	@UseGuards(AuthGuard("jwt"))
	appendLike(
		@Req() req :Request,
		@Body() applicant: Applicant,
		@Param("postId") postId: number,
	): void {
		const cookie = RequestUtility.fromAuthCookie()(req);

		console.debug(postId);

		this.applyService.appendApplicant(postId, Number(cookie.sub), applicant.applicantClass, applicant.applicantId);
	}

	@Delete("/:postId")
	@UseGuards(AuthGuard("jwt"))
	deleteLike(@Req() req :Request, @Param("postId") postId: number): void {
		const cookie = RequestUtility.fromAuthCookie()(req);

		this.applyService.deleteApplicant(Number(postId), Number(cookie.sub));
	}
}
