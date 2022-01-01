import { Module } from "@nestjs/common";
import { PuppeteerModule } from "nest-puppeteer";
import { MainController } from "src/controller/main.controller";
import { CrawlingService } from "src/service/crawling.service";
import { PageParser } from "src/util/pageParser";
import { PostModule } from "./post.module";
import { RedisCacheModule } from "./redis.module";

@Module({
	imports: [PuppeteerModule.forRoot({ pipe: true }), RedisCacheModule, PostModule],
	controllers: [MainController],
	providers: [CrawlingService, PageParser,],
})
export class MainModule {}
