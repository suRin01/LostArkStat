import { Module } from "@nestjs/common";
import { LikeController } from "src/controller/like.controller";
import { Mapper } from "src/mapper/mapper";
import { ApplyService } from "src/service/apply.service";

@Module({
	imports: [],
	controllers: [LikeController],
	providers: [Mapper, ApplyService],
})
export class ApplyModule {}
