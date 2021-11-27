import { Get, Controller, Render, Query, UseFilters, Res, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { response } from "express";
import { CharacterSearchFilter } from "src/filter/character.search.filter";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { CharacterProfile } from "src/model/character.profile.model";
import { CrawlingService } from "src/service/crawling.service";
import { RequestUtility } from "src/util/req.util";

@Controller("/")
export class MainController {
	constructor(private crawlingService: CrawlingService) {}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	loginPage(@Res() res, @Req() req):void {
		const accessToken:string = RequestUtility.fromAuthCookie()(req);
		res.render("index", {isLogin: true, name: RequestUtility.parseJwt(accessToken).useranme})

		return;
	}

	@Get("/search")
	@UseFilters(CharacterSearchFilter)
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
