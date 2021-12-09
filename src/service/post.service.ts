import { Injectable } from "@nestjs/common";
import { postQueryString } from "src/common/query";
import { CreatePostDTO } from "src/dto/createPost.dto";
import { ExecutionResult } from "src/dto/executionResult.dto";
import { Mapper } from "../mapper/mapper";

@Injectable()
export class PostService {
	constructor(private readonly mapper: Mapper) {}

	async getPost(idx: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.findOne, [idx]);
	}

	async getPosts(offset: number): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.findPosts, [offset]);
	}

	async createPost(post: CreatePostDTO): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.createOne, [
			post.user_id,
			post.content,
		]);
	}

	async deletePost(idx: string, userId: number): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.deleteOne, [
			idx,
			userId,
		]);
	}
}
