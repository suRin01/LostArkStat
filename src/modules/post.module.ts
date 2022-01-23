import { Module } from "@nestjs/common";
import { PostController } from "../controller/post.controller";
import { Mapper } from "../mapper/mapper";
import { ImageService } from "../service/image.service";
import { ApplyService } from "../service/apply.service";
import { PostService } from "../service/post.service";
import { AuthModule } from "./auth.module";

@Module({
	imports: [AuthModule],
	controllers: [PostController],
	providers: [PostService, Mapper, ImageService, ApplyService],
	exports: [PostService]
})
export class PostModule {}
