import { Module } from "@nestjs/common";
import { PostController } from "src/controller/post.controller";
import { Mapper } from "src/mapper/mapper";
import { ImageService } from "src/service/image.service";
import { ApplyService } from "src/service/apply.service";
import { PostService } from "src/service/post.service";
import { AuthModule } from "./auth.module";

@Module({
	imports: [AuthModule],
	controllers: [PostController],
	providers: [PostService, Mapper, ImageService, ApplyService],
	exports: [PostService]
})
export class PostModule {}
