import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { applyQueryString } from "../common/query";
import { ExecutionResult } from "src/dto/executionResult.dto";

@Injectable()
export class ApplyService {
	constructor(private readonly mapper: Mapper) {}

	async appendApplicant(postId: number, userId: number, applicantClass: string, applicantId: string): Promise<void> {
		this.mapper.mapper(applyQueryString.createOne, [postId, userId, applicantClass, applicantId]);
	}

	async deleteApplicant(postId: number, userId: number): Promise<void> {
		this.mapper.mapper(applyQueryString.deleteOne, [postId, userId]);
	}

	async getApplicants(postId: number): Promise<ExecutionResult> {
		return this.mapper.mapper(applyQueryString.findAll, [postId]);
	}
}
