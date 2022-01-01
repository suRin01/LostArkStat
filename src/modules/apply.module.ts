import { Module } from "@nestjs/common";
import { ApplyController } from "src/controller/apply.controller";
import { Mapper } from "src/mapper/mapper";
import { ApplyService } from "src/service/apply.service";

@Module({
	imports: [],
	controllers: [ApplyController],
	providers: [Mapper, ApplyService],
})
export class ApplyModule {}
