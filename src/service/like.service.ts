import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { likeQueryString } from "../common/query";
import { ExecutionResult } from "src/dto/executionResult.dto";

@Injectable()
export class LikeService {
	constructor(private readonly mapper: Mapper) {}

	async appendLike(postId: number, userId: number): Promise<void> {
		this.mapper.mapper(likeQueryString.createOne, [postId, userId]);
	}

	async deleteLike(postId: number, userId: number): Promise<void> {
		this.mapper.mapper(likeQueryString.deleteOne, [postId, userId]);
	}

	async getLikes(postId: number): Promise<ExecutionResult> {
		return this.mapper.mapper(likeQueryString.findAll, [postId]);
	}
}
