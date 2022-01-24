import { Module } from "@nestjs/common";
import { ApplyController } from "../controller/apply.controller";
import { Mapper } from "../mapper/mapper";
import { ApplyService } from "../service/apply.service";

@Module({
	imports: [],
	controllers: [ApplyController],
	providers: [Mapper, ApplyService],
	exports: [ApplyService, Mapper]
})
export class ApplyModule {}
