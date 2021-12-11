import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { imageQueryString } from "../common/query";
import { ExecutionResult } from "src/dto/executionResult.dto";

@Injectable()
export class ImageService {
	constructor(private readonly mapper: Mapper) {}
	async getImages(postId: number): Promise<ExecutionResult> {
		const data = await this.mapper.mapper(imageQueryString.findAll, [postId]);
		return data;
	}

	async createImages(postId: number, imagePaths: string[]): Promise<ExecutionResult> {
		try {
			imagePaths.forEach(async (imagePath) => {
				await this.mapper.mapper(imageQueryString.createOne, [postId, imagePath]);
			});

			return {
				status: 200,
				data: [],
			};
		} catch {
			return {
				status: 500,
				data: [],
			};
		}
	}
}
