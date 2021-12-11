import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { commentQueryString } from "../common/query";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { CommentDTO } from "src/dto/comment.dto";

@Injectable()
export class CommentService {
	constructor(private readonly mapper: Mapper) {}
	async getComments(postId: string): Promise<ExecutionResult> {
		const data = await this.mapper.mapper(commentQueryString.findAll, [
			postId,
		]);
		return data;
	}

	async createComment(commentData: CommentDTO): Promise<ExecutionResult> {
		const result = await this.mapper.mapper(commentQueryString.createOne, [
			commentData.user_id,
			commentData.post_id,
			commentData.parent_id,
			commentData.content,
		]);

		return result;
	}

	async deleteComment(
		commentId: number,
		username: string,
	): Promise<ExecutionResult> {
		const result = await this.mapper.mapper(commentQueryString.deleteOne, [
			commentId,
			username,
		]);

		return result;
	}
}
