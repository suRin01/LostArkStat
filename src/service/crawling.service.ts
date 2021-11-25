import type { Browser, ElementHandle } from "puppeteer";
import { Injectable } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";
import { StaticKey } from "src/common/staticKey";
import { selector } from "src/common/querySelector";
import { engraveList } from "src/common/engrave";
import { Page } from "puppeteer";
import { CharacterProfile } from "src/model/character.profile.model";
import { PageParser } from "src/util/pageParser";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private readonly browser: Browser) {}

	async getData(id: string): Promise<CharacterProfile> {
		const page: Page = await this.browser.newPage();

		await page.goto("https://lostark.game.onstove.com/Profile/Character/" + id);

		const profileJson = await page.evaluate(()=>{
			return this["$"]["Profile"];
		})
		
		const equip = profileJson["Equip"];
		const engrave = profileJson["Engrave"];
		const pageParser:PageParser = new PageParser();


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
				await pageParser.getInnerText(page, selector.possessionLevelFirst) +
				await pageParser.getInnerText(page, selector.possessionLevelSecond),
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
			engravement: { first: pageParser.getEngrave(engrave, "000"), second: pageParser.getEngrave(engrave, "001") },
		};
		
		// const profileData = await page.evaluate(
		// 	(StaticKey, selector, engraveList) => {
		// 		function getItemObject(equip, ItemCode: string) {
		// 			if (equip === undefined) {
		// 				return undefined;
		// 			}
		// 			const key: string = Object.getOwnPropertyNames(equip)[0].slice(0, 8);

		// 			const itemObject = equip[key + "_" + ItemCode];
		// 			return itemObject;
		// 		}

		// 		function getItem(equip, ItemCode) {
		// 			const itemObject = getItemObject(equip, ItemCode);
		// 			if (itemObject === undefined) {
		// 				return {
		// 					icon: "/images/blank.png",
		// 					name: "",
		// 					tier: "grade0",
		// 				};
		// 			}

		// 			return {
		// 				icon:
		// 					"https://cdn-lostark.game.onstove.com/" +
		// 					itemObject["Element_001"]["value"]["slotData"]["iconPath"],
		// 				name: itemObject["Element_000"]["value"].replace(/<[^>]*>/gm, " ").trim(),
		// 				tier: getTier(itemObject["Element_001"]["value"]["leftStr0"]),
		// 			};
		// 		}

		// 		function getTier(itemString: string): string {
		// 			if (itemString.includes("유물")) {
		// 				return "grade5";
		// 			} else if (itemString.includes("전설") || itemString === "12") {
		// 				return "grade4";
		// 			} else if (itemString.includes("영웅") || itemString === "9") {
		// 				return "grade3";
		// 			} else if (itemString.includes("희귀") || itemString === "6") {
		// 				return "grade2";
		// 			} else if (itemString.includes("일반") || itemString === "3") {
		// 				return "grade2";
		// 			}
		// 		}

		// 		function getStoneStat(equip, ItemCode) {
		// 			const itemObject = getItemObject(equip, ItemCode);
		// 			if (itemObject === undefined) {
		// 				return {};
		// 			}
		// 			let stoneStatString: string;
		// 			if (itemObject["Element_005"]["value"]["Element_000"].includes("세공 단계 보너스")) {
		// 				stoneStatString = itemObject["Element_006"]["value"]["Element_001"];
		// 			} else {
		// 				stoneStatString = itemObject["Element_005"]["value"]["Element_001"];
		// 			}

		// 			const result = stoneStatString.match(/\+(\d+)/gm);
		// 			for (let idx = 0, len = result.length; idx < len; idx++) {
		// 				result[idx] = result[idx].replace("+", "");
		// 			}

		// 			return {
		// 				buffFirst: result[0],
		// 				buffSecond: result[1],
		// 				debuff: result[2],
		// 			};
		// 		}

		// 		function getEngrave(engrave, order) {
		// 			const engraveObject = getItemObject(engrave, order);
		// 			if (engraveObject === undefined) {
		// 				return {};
		// 			}
		// 			const stat = engraveObject["Element_002"]["value"].match(/>(\d+)/gm)[0].replace(">", "");
		// 			return {
		// 				name: engraveObject["Element_000"]["value"],
		// 				stat: "+" + stat,
		// 				icon:
		// 					"/images/engrave/" +
		// 					String(engraveList[engraveObject["Element_000"]["value"]]).padStart(3, "0") +
		// 					".png",
		// 				tier: getTier(stat),
		// 			};
		// 		}

		// 		function getActiveEngraveArray() {
		// 			const nodeArray = document.querySelectorAll(
		// 				"#profile-ability > div.profile-ability-engrave > div > div.swiper-wrapper > ul > * > span",
		// 			);
		// 			const engraveArray = [];
		// 			for (let idx = 0, len = nodeArray.length; idx < len; idx++) {
		// 				engraveArray[idx] = {
		// 					name: nodeArray[idx],
		// 					icon:
		// 						"/images/engrave/" +
		// 						String(engraveList[nodeArray[idx].split(" Lv")[0]]).padStart(3, "0") +
		// 						".png",
		// 				};
		// 			}

		// 			return engraveArray;
		// 		}

		// 		if (this["$"] === undefined) {
		// 			return null;
		// 		}

		// 		const profile = this["$"]["Profile"];
		// 		const equip = profile["Equip"];
		// 		const engrave = profile["Engrave"];

		// 		return {
		// 			activeEngrave: getActiveEngraveArray(),
		// 			characterName: document.querySelector(selector.characterName),
		// 			server: document.querySelector(selector.server).replace("@", ""),
		// 			guild: document.querySelector(selector.guild),
		// 			characterClass: document.querySelector(selector.characterClass)["alt"],
		// 			characterTitle: document.querySelector(selector.characterTitle),
		// 			level: document.querySelector(selector.level),
		// 			itemLevel: document.querySelector(selector.itemLevel),
		// 			expeditionLevel: document.querySelector(selector.expeditionLevel),
		// 			duelLevel: document.querySelector(selector.duelLevel),
		// 			possessionLevel:
		// 				document.querySelector(selector.possessionLevelFirst) +
		// 				document.querySelector(selector.possessionLevelSecond),

		// 			combatPower: document.querySelector(selector.combatPower),
		// 			healthPoint: document.querySelector(selector.healthPoint),

		// 			criticalScore: document.querySelector(selector.criticalScore),
		// 			specializationScore: document.querySelector(selector.specializationScore),
		// 			suppressScore: document.querySelector(selector.suppressScore),
		// 			speedScore: document.querySelector(selector.speedScore),
		// 			patienceScore: document.querySelector(selector.patienceScore),
		// 			skilledScore: document.querySelector(selector.skilledScore),

		// 			intelligence: document.querySelector(selector.intelligence),
		// 			courage: document.querySelector(selector.courage),
		// 			charming: document.querySelector(selector.charming),
		// 			kindness: document.querySelector(selector.kindness),

		// 			island: document.querySelector(selector.island),
		// 			star: document.querySelector(selector.star),
		// 			heart: document.querySelector(selector.heart),
		// 			picture: document.querySelector(selector.picture),
		// 			mokoko: document.querySelector(selector.mokoko),
		// 			expedition: document.querySelector(selector.expedition),
		// 			ignea: document.querySelector(selector.leaf),
		// 			leaf: document.querySelector(selector.leaf),

		// 			hat: getItem(equip, StaticKey.hat),
		// 			top: getItem(equip, StaticKey.top),
		// 			bottom: getItem(equip, StaticKey.bottom),
		// 			gloves: getItem(equip, StaticKey.gloves),
		// 			shoulder: getItem(equip, StaticKey.shoulder),
		// 			weapon: getItem(equip, StaticKey.weapon),
		// 			necklace: getItem(equip, StaticKey.necklace),
		// 			earringOne: getItem(equip, StaticKey.earringOne),
		// 			earringTwo: getItem(equip, StaticKey.earringTwo),
		// 			ringOne: getItem(equip, StaticKey.ringOne),
		// 			ringTwo: getItem(equip, StaticKey.ringTwo),
		// 			abilityStone: getItem(equip, StaticKey.abilityStone),
		// 			abilityStoneStat: getStoneStat(equip, StaticKey.abilityStone),
		// 			bracelet: getItem(equip, StaticKey.bracelet),

		// 			engravement: { first: getEngrave(engrave, "000"), second: getEngrave(engrave, "001") },
		// 		};
		// 	},
		// 	StaticKey,
		// 	selector,
		// 	engraveList,
		// );

		// return profileData;



	}
}
