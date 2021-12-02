import { Browser } from "puppeteer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";
import { selector } from "src/common/querySelector";
import { Page } from "puppeteer";
import { CharacterProfile } from "src/model/character.profile.model";
import { PageParser } from "src/util/pageParser";
import { urls } from "src/common/url";
import { RedisCacheService } from "src/service/cache.service";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private browser: Browser, private readonly pageParser: PageParser, private readonly redisCacheService: RedisCacheService) {}

	async getData(id: string): Promise<CharacterProfile> {
		const page: Page = await this.browser.newPage();

		await page.goto(urls.stoveProfileSearch + id);

		const profileJson = await page.evaluate(() => {
			return this["$"]["Profile"];
		});
		try{
			const equip = profileJson["Equip"];
			const engrave = profileJson["Engrave"];
			// const pageParser: PageParser = new PageParser();

			return {
				activeEngrave: await this.pageParser.getInnerItemArray(page, selector.activeEngrave),
				characterName: await this.pageParser.getInnerText(page, selector.characterName),
				server: (await this.pageParser.getInnerText(page, selector.server)).replace("@", ""),
				guild: await this.pageParser.getInnerText(page, selector.guild),
				characterClass: await this.pageParser.getInnerText(page, selector.characterClass)["alt"],
				characterTitle: await this.pageParser.getInnerText(page, selector.characterTitle),
				level: await this.pageParser.getInnerText(page, selector.level),
				itemLevel: await this.pageParser.getInnerText(page, selector.itemLevel),
				expeditionLevel: await this.pageParser.getInnerText(page, selector.expeditionLevel),
				duelLevel: await this.pageParser.getInnerText(page, selector.duelLevel),
				possessionLevel:
					(await this.pageParser.getInnerText(page, selector.possessionLevelFirst)) +
					(await this.pageParser.getInnerText(page, selector.possessionLevelSecond)),
				combatPower: await this.pageParser.getInnerText(page, selector.combatPower),
				healthPoint: await this.pageParser.getInnerText(page, selector.healthPoint),
				criticalScore: await this.pageParser.getInnerText(page, selector.criticalScore),
				specializationScore: await this.pageParser.getInnerText(page, selector.specializationScore),
				suppressScore: await this.pageParser.getInnerText(page, selector.suppressScore),
				speedScore: await this.pageParser.getInnerText(page, selector.speedScore),
				patienceScore: await this.pageParser.getInnerText(page, selector.patienceScore),
				skilledScore: await this.pageParser.getInnerText(page, selector.skilledScore),
				intelligence: await this.pageParser.getInnerText(page, selector.intelligence),
				courage: await this.pageParser.getInnerText(page, selector.courage),
				charming: await this.pageParser.getInnerText(page, selector.charming),
				kindness: await this.pageParser.getInnerText(page, selector.kindness),
				island: await this.pageParser.getInnerText(page, selector.island),
				star: await this.pageParser.getInnerText(page, selector.star),
				heart: await this.pageParser.getInnerText(page, selector.heart),
				picture: await this.pageParser.getInnerText(page, selector.picture),
				mokoko: await this.pageParser.getInnerText(page, selector.mokoko),
				expedition: await this.pageParser.getInnerText(page, selector.expedition),
				ignea: await this.pageParser.getInnerText(page, selector.leaf),
				leaf: await this.pageParser.getInnerText(page, selector.leaf),
				hat: this.pageParser.getItem(equip, await this.redisCacheService.get("hat")),
				top: this.pageParser.getItem(equip, await this.redisCacheService.get("top")),
				bottom: this.pageParser.getItem(equip, await this.redisCacheService.get("bottom")),
				gloves: this.pageParser.getItem(equip, await this.redisCacheService.get("gloves")),
				shoulder: this.pageParser.getItem(equip, await this.redisCacheService.get("shoulder")),
				weapon: this.pageParser.getItem(equip, await this.redisCacheService.get("weapon")),
				necklace: this.pageParser.getItem(equip, await this.redisCacheService.get("necklace")),
				earringOne: this.pageParser.getItem(equip, await this.redisCacheService.get("earringOne")),
				earringTwo: this.pageParser.getItem(equip, await this.redisCacheService.get("earringTwo")),
				ringOne: this.pageParser.getItem(equip, await this.redisCacheService.get("ringOne")),
				ringTwo: this.pageParser.getItem(equip, await this.redisCacheService.get("ringTwo")),
				abilityStone: this.pageParser.getItem(equip, await this.redisCacheService.get("abilityStone")),
				abilityStoneStat: this.pageParser.getStoneStat(equip, await this.redisCacheService.get("abilityStoneStat")),
				bracelet: this.pageParser.getItem(equip, await this.redisCacheService.get("bracelet")),
				engravement: {
					first: await this.pageParser.getEngrave(engrave, "000"),
					second: await this.pageParser.getEngrave(engrave, "001"),
				},
			};
		}catch{
			throw new InternalServerErrorException();
		}
	}
}
