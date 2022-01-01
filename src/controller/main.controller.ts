import { Get, Controller, Render, Query, UseFilters, Res, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CharacterSearchFilter } from "src/filter/character.search.filter";
import { LoginAuthFilter } from "src/filter/LoginAuth.Filter";
import { CharacterProfile } from "src/model/character.profile.model";
import { RedisCacheService } from "src/service/cache.service";
import { CrawlingService } from "src/service/crawling.service";
import { RequestUtility } from "src/util/req.util";
import { Request, Response } from "express";
import { PostService } from "src/service/post.service";
import { PostDTO } from "src/dto/post.dto";
import JwtToken from "src/model/jwt.token.model";
import jwtPayload from "src/model/jwt.payload.model";

@Controller("/")
export class MainController {
	constructor(private crawlingService: CrawlingService, private readonly redisCacheService: RedisCacheService, private readonly postService: PostService) {}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	@UseFilters(LoginAuthFilter)
	loginPage(@Res() res:Response, @Req() req:Request):void {
		const jwtTokenData: JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwtParsedData: jwtPayload = RequestUtility.parseJwt(jwtTokenData.Authorization)
		console.debug(jwtParsedData)
		res.render("index", {isLogin: true, name: jwtParsedData.username})

		return;
	}

	@Get("/search")
	@UseFilters(CharacterSearchFilter)
	@Render("character")
	async character(@Query("username") id: string): Promise<CharacterProfile> {
		return this.crawlingService.getData(id);
	}

	@Get("/apply")
	@UseGuards(AuthGuard("jwt"))
	@Render("apply")
	async apply(@Query("post_id") postIdx: string): Promise<PostDTO>{
		console.debug(postIdx);
		console.debug(await this.postService.getPost(postIdx));
		const result = await this.postService.getPost(postIdx);
		return result.data[0] as PostDTO;
		
	}


	@Get("raids")
	@Render("raids")
	async raids(
		@Req() req: Request): Promise<Record<string, string>>{
			
		const jwtTokenData: JwtToken = RequestUtility.fromAuthCookie()(req);
		const jwtParsedData: jwtPayload = RequestUtility.parseJwt(jwtTokenData.Authorization);
		
		return {mainCharacter: jwtParsedData.mainCharacter};
	}

	@Get("reservation")
	@Render("new_reservation")
	async newReservation(): Promise<void>{
		return;
	}

}
