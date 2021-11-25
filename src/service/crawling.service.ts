import { Browser } from "puppeteer";
import { Injectable } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";
import { StaticKey } from "src/common/staticKey";
import { selector } from "src/common/querySelector";
import { Page } from "puppeteer";
import { CharacterProfile } from "src/model/character.profile.model";
import { PageParser } from "src/util/pageParser";
import { urls } from "src/common/url";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private browser: Browser) {}

	async getData(id: string): Promise<CharacterProfile> {
		const page: Page = await this.browser.newPage();

		await page.goto(urls.stoveProfileSearch + id);

		const profileJson = await page.evaluate(() => {
			return this["$"]["Profile"];
		});

		const equip = profileJson["Equip"];
		const engrave = profileJson["Engrave"];
		const pageParser: PageParser = new PageParser();

		return {
			activeEngrave: await pageParser.getInnerItemArray(page, selector.activeEngrave),
			characterName: await pageParser.getInnerText(page, selector.characterName),
			server: (await pageParser.getInnerText(page, selector.server)).replace("@", ""),
			guild: await pageParser.getInnerText(page, selector.guild),
			characterClass: await pageParser.getInnerText(page, selector.characterClass)["alt"],
			characterTitle: await pageParser.getInnerText(page, selector.characterTitle),
			level: await pageParser.getInnerText(page, selector.level),
			itemLevel: await pageParser.getInnerText(page, selector.itemLevel),
			expeditionLevel: await pageParser.getInnerText(page, selector.expeditionLevel),
			duelLevel: await pageParser.getInnerText(page, selector.duelLevel),
			possessionLevel:
				(await pageParser.getInnerText(page, selector.possessionLevelFirst)) +
				(await pageParser.getInnerText(page, selector.possessionLevelSecond)),
			combatPower: await pageParser.getInnerText(page, selector.combatPower),
			healthPoint: await pageParser.getInnerText(page, selector.healthPoint),
			criticalScore: await pageParser.getInnerText(page, selector.criticalScore),
			specializationScore: await pageParser.getInnerText(page, selector.specializationScore),
			suppressScore: await pageParser.getInnerText(page, selector.suppressScore),
			speedScore: await pageParser.getInnerText(page, selector.speedScore),
			patienceScore: await pageParser.getInnerText(page, selector.patienceScore),
			skilledScore: await pageParser.getInnerText(page, selector.skilledScore),
			intelligence: await pageParser.getInnerText(page, selector.intelligence),
			courage: await pageParser.getInnerText(page, selector.courage),
			charming: await pageParser.getInnerText(page, selector.charming),
			kindness: await pageParser.getInnerText(page, selector.kindness),
			island: await pageParser.getInnerText(page, selector.island),
			star: await pageParser.getInnerText(page, selector.star),
			heart: await pageParser.getInnerText(page, selector.heart),
			picture: await pageParser.getInnerText(page, selector.picture),
			mokoko: await pageParser.getInnerText(page, selector.mokoko),
			expedition: await pageParser.getInnerText(page, selector.expedition),
			ignea: await pageParser.getInnerText(page, selector.leaf),
			leaf: await pageParser.getInnerText(page, selector.leaf),
			hat: pageParser.getItem(equip, StaticKey.hat),
			top: pageParser.getItem(equip, StaticKey.top),
			bottom: pageParser.getItem(equip, StaticKey.bottom),
			gloves: pageParser.getItem(equip, StaticKey.gloves),
			shoulder: pageParser.getItem(equip, StaticKey.shoulder),
			weapon: pageParser.getItem(equip, StaticKey.weapon),
			necklace: pageParser.getItem(equip, StaticKey.necklace),
			earringOne: pageParser.getItem(equip, StaticKey.earringOne),
			earringTwo: pageParser.getItem(equip, StaticKey.earringTwo),
			ringOne: pageParser.getItem(equip, StaticKey.ringOne),
			ringTwo: pageParser.getItem(equip, StaticKey.ringTwo),
			abilityStone: pageParser.getItem(equip, StaticKey.abilityStone),
			abilityStoneStat: pageParser.getStoneStat(equip, StaticKey.abilityStone),
			bracelet: pageParser.getItem(equip, StaticKey.bracelet),
			engravement: {
				first: pageParser.getEngrave(engrave, "000"),
				second: pageParser.getEngrave(engrave, "001"),
			},
		};
	}
}
