import { Get, Controller, Render, Param, Query } from "@nestjs/common";
import { CrawlingService } from "src/service/crawling.service";

@Controller("/")
export class MainController {
	constructor(private crawlingService: CrawlingService) {}

	@Get()
	@Render("index")
	loginPage() {
		return { message: "hello" };
	}

	@Get("/search")
	@Render("character")
	character(@Query("userName") id: string) {
		const profileData = this.crawlingService.getData(id);

		return profileData;
	}
}
