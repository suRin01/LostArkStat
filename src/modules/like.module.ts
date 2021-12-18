import { Module } from "@nestjs/common";
import { LikeController } from "src/controller/like.controller";
import { Mapper } from "src/mapper/mapper";
import { LikeService } from "src/service/like.service";

@Module({
	imports: [],
	controllers: [LikeController],
	providers: [Mapper, LikeService],
})
export class LikeModule {}
