import { Get, Controller, Render, Query } from "@nestjs/common";
import { CharacterProfile } from "src/model/character.profile.model";
import { CrawlingService } from "src/service/crawling.service";

@Controller("/")
export class MainController {
	constructor(private crawlingService: CrawlingService) {}

	@Get()
	@Render("index")
	loginPage(): Record<string, string> {
		return { message: "hello" };
	}

	@Get("/search")
	@Render("character")
	async character(@Query("username") id: string): Promise<CharacterProfile> {
		return this.crawlingService.getData(id);
	}

	@Get("/test")
	@Render("oauthTest")
	test(): void {
		return;
	}
}
