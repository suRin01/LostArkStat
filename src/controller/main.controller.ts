import { Get, Controller, Render, Query, UseFilters, Res, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CharacterSearchFilter } from "src/filter/character.search.filter";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { CharacterProfile } from "src/model/character.profile.model";
import { RedisCacheService } from "src/service/cache.service";
import { CrawlingService } from "src/service/crawling.service";
import { WinstonLogger } from "src/util/logger";
import { RequestUtility } from "src/util/req.util";

@Controller("/")
export class MainController {
	constructor(private crawlingService: CrawlingService, private readonly redisCacheService: RedisCacheService) {}

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
	async test(): Promise<void> {
		WinstonLogger.getInstance().info(await this.redisCacheService.get("aa"));
		return;
	}
}
