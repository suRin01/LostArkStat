import { Injectable } from "@nestjs/common";
import { postQueryString } from "../common/query";
import { PostDTO } from "../dto/post.dto";
import { ExecutionResult } from "../dto/executionResult.dto";
import { Mapper } from "../mapper/mapper";

@Injectable()
export class PostService {
	constructor(private readonly mapper: Mapper) {}

	async getPost(idx: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.findOne, [idx]);
	}

	async getPosts(guildName: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.findPosts, [guildName]);
	}

	async createPost(post: PostDTO): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.createOne, [
			post.user_idx,
			post.commander,
			post.target,
			post.date,
			post.constraint,
			post.comment,
			post.guildName
		]);
	}

	async deletePost(idx: string, userId: number): Promise<ExecutionResult> {
		return await this.mapper.mapper(postQueryString.deleteOne, [
			idx,
			userId,
		]);
	}
}
