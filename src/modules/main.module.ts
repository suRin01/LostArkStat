import { Module } from "@nestjs/common";
import { MainController } from "src/controller/main.controller";

@Module({
	imports: [],
	controllers: [MainController],
	providers: [],
})
export class MainModule {}
