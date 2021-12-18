import { Module } from "@nestjs/common";
import { CommentController } from "src/controller/comment.controller";
import { Mapper } from "src/mapper/mapper";
import { CommentService } from "src/service/comment.service";

@Module({
	controllers: [CommentController],
	providers: [CommentService, Mapper],
	exports: [CommentService],
})
export class CommentModule {}
