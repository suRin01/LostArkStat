import {
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { CommentDTO } from "src/dto/comment.dto";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { PostDTO } from "src/dto/post.dto";
import CommentData from "src/model/comment.model";
import { PostObject } from "src/model/postData.model";

export class dataCasting {
	public static toPostData(executionResult: ExecutionResult): PostObject[] {
		if (executionResult.status !== 200) {
			throw InternalServerErrorException;
		} else if (executionResult.data.length === 0) {
			return [];
		}
		const result: PostObject[] = [];
		for (let idx = 0, len = executionResult.data.length; idx < len; idx++) {
			const data: PostDTO = executionResult.data[idx] as PostDTO;
			const tempPost: PostObject = {
				_id: data._id.toString(),
				createAt: data.created_at,
				updatedAt: data.updated_at,
				content: data.content,
				User: {
					_id: data.user_id,
					name: data.username,
					Image: { path: data.profile_image },
				},
				Images: data.Images,
				Like: data.Like,
				Comment: data.comments,
			};
			result.push(tempPost);
		}

		return result;
	}

	public static toCommentData(
		executionResult: ExecutionResult,
	): CommentData[] {
		if (executionResult.status !== 200) {
			throw InternalServerErrorException;
		} else if (executionResult.data.length === 0) {
			return [];
		}
		const result: CommentData[] = [];
		for (let idx = 0, len = executionResult.data.length; idx < len; idx++) {
			const data: CommentDTO = executionResult.data[idx] as CommentDTO;
			const tempPost: CommentData = {
				_id: data._id,
				createdAt: data.created_at,
				content: data.content,
				User: {
					name: data.username,
					Image: { path: data.profile_image },
				},
				parentId: data.parent_id,
				postId: data.post_id,
			};
			result.push(tempPost);
		}

		return result;
	}

	public static parseJwt(token: string): Record<string, string> {
		const base64Url: string = token.split(".")[1];
		const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload: string = decodeURIComponent(
			Buffer.from(base64, "base64")
				.toString("binary")
				.split("")
				.map(function (character) {
					return (
						"%" +
						("00" + character.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join(""),
		);

		return JSON.parse(jsonPayload);
	}
}
