import { Module } from "@nestjs/common";
import { PuppeteerModule } from "nest-puppeteer";
import { MainController } from "src/controller/main.controller";
import { CrawlingService } from "src/service/crawling.service";

@Module({
	imports: [PuppeteerModule.forRoot({ pipe: true })],
	controllers: [MainController],
	providers: [CrawlingService],
})
export class MainModule {}
