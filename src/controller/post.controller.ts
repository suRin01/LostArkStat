import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Redirect,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostService } from "../service/post.service";
import { RequestUtility } from "src/util/req.util";
import { PostData } from "src/model/post.model";
import { Request } from "express";
import jwtPayload from "src/model/jwt.payload.model";
import { ApplyService } from "src/service/apply.service";
import { PostDTO } from "src/dto/post.dto";
import { Applicant } from "src/model/applicant.model";
import JwtToken from "src/model/jwt.token.model";

@Controller("api/posts")
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly applyServcie: ApplyService
	) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/")
	async getPosts(@Req() req: Request): Promise<PostDTO[]> {

		const jwtTokenData: JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwtParsedData: jwtPayload = RequestUtility.parseJwt(jwtTokenData.Authorization);
		

		let posts: PostDTO[] = (await this.postService.getPosts(jwtParsedData.guildName)).data as PostDTO[];

		for(let idx = 0, len = posts.length; idx<len; idx++){
			const postId: number = posts[idx].post_idx;
			const applicants: Applicant[] = (await this.applyServcie.getApplicants(postId)).data as Applicant[];
			posts[idx].applicants = applicants;
		}
		return posts;
	}

	@Get("/:idx")
	async getPost(@Param("idx") idx: string): Promise<ExecutionResult> {
		const result = await this.postService.getPost(idx);

		return result;
	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	@Redirect("/raids")
	async createPost(
		@Body() post: PostData,
		@Req() req: Request,
	): Promise<void> {
		const jwtTokenData: JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwtParsedData: jwtPayload = RequestUtility.parseJwt(jwtTokenData.Authorization);
		
		const createPostResult = await this.postService.createPost({
			user_idx: Number(jwtParsedData.idx),
			commander: post.commander,
			target: `${post.from},${post.to}`,
			date: new Date(`${post.raidDate} ${post.raidTime}:00`),
			constraint: post.constraint,
			comment: post.comment,
			guildName: jwtParsedData.guildName
		});

		await this.applyServcie.appendApplicant(createPostResult.affectedRow, Number(jwtParsedData.idx), post.applicantClass, post.applicantId);

		return;
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/:idx")
	async deletePost(
		@Param("idx") idx: string,
		@Req() req,
	): Promise<ExecutionResult> {
		const jwtToken: JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwtTokenData: jwtPayload = RequestUtility.parseJwt(jwtToken.Authorization);

		console.debug(jwtTokenData, idx);

		return await this.postService.deletePost(idx, Number(jwtTokenData.sub));
	}
}
