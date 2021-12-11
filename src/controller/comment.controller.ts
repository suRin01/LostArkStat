import {
	Get,
	Controller,
	Post,
	Body,
	UploadedFile,
	Delete,
	Query,
	UseGuards,
	Req,
	Param,
} from "@nestjs/common";

import { ExecutionResult } from "src/dto/executionResult.dto";
import { AuthGuard } from "@nestjs/passport";
import { CommentService } from "src/service/comment.service";
import CommentData from "src/model/comment.model";
import { RequestUtility } from "src/util/req.util";
import { dataCasting } from "src/util/response.util";

@Controller("api/comments")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get("/")
	async getComments(@Query("postId") postId: string): Promise<CommentData[]> {
		const data = await this.commentService.getComments(postId);

		return dataCasting.toCommentData(data);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createComment(
		@Body() commentData: CommentData,
		@Req() req,
	): Promise<ExecutionResult> {
		const jwtTokenData: string = RequestUtility.fromAuthCookie()(req);
		const userData = RequestUtility.parseJwt(jwtTokenData);

		const result = await this.commentService.createComment({
			post_id: commentData.postId,
			parent_id: commentData.parentId ? commentData.parentId : null,
			user_id: userData.username,
			content: commentData.content,
		});
		return result;
	}

	@Delete("/:id")
	async deleteComment(@Param("id") commentId: number, @Req() req) {
		const jwtTokenData: string = RequestUtility.fromAuthCookie()(req);
		const userData = RequestUtility.parseJwt(jwtTokenData);

		const result = await this.commentService.deleteComment(
			commentId,
			userData.username,
		);
		console.debug(commentId);
	}
}
