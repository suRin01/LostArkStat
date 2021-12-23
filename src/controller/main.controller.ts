import { Get, Controller, Render, Query, UseFilters, Res, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CharacterSearchFilter } from "src/filter/character.search.filter";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { CharacterProfile } from "src/model/character.profile.model";
import { RedisCacheService } from "src/service/cache.service";
import { CrawlingService } from "src/service/crawling.service";
import { WinstonLogger } from "src/util/logger";
import { RequestUtility } from "src/util/req.util";
// import * as redis from "redis";
import { createClient } from "redis";

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
	@Render("reservation")
	async test(): Promise<void> {
		const client = createClient({
				url: "redis://:silverlistic97!@203.232.193.178:9779",
			});
		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();
		const result = await client.get("bottom");

		console.debug(result);
		return;

	}

	@Get("testPage")
	@Render("reservation")
	async render(): Promise<void>{
		return;
	}

	@Get("testNewReservation")
	@Render("new_reservation")
	async newReservation(): Promise<void>{
		return;
	}
}
