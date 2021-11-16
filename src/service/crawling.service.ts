import type { Browser } from "puppeteer";
import { Injectable } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";
import { StaticKey } from "src/common/staticKey";
import { selector } from "src/common/querySelector";
import { engraveList } from "src/common/engrave";
import { Page } from "puppeteer";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private readonly browser: Browser) {}

	async getData(id: string): Promise<any> {
		const page: Page = await this.browser.newPage();

		await page.goto("https://lostark.game.onstove.com/Profile/Character/" + id);

		const profileData = await page.evaluate(
			(StaticKey, selector, engraveList) => {
				function getItemObject(equip, ItemCode: string) {
					if (equip === undefined) {
						return undefined;
					}
					const key: string = Object.getOwnPropertyNames(equip)[0].slice(0, 8);

					const itemObject = equip[key + "_" + ItemCode];
					return itemObject;
				}

				function getItem(equip, ItemCode) {
					const itemObject = getItemObject(equip, ItemCode);
					if (itemObject === undefined) {
						return {
							icon: "/images/blank.png",
							name: "",
							tier: "grade0",
						};
					}

					return {
						icon:
							"https://cdn-lostark.game.onstove.com/" +
							itemObject["Element_001"]["value"]["slotData"]["iconPath"],
						name: itemObject["Element_000"]["value"].replace(/<[^>]*>/gm, " ").trim(),
						tier: getTier(itemObject["Element_001"]["value"]["leftStr0"]),
					};
				}

				function getTier(itemString: string): string {
					if (itemString.includes("유물")) {
						return "grade5";
					} else if (itemString.includes("전설") || itemString === "12") {
						return "grade4";
					} else if (itemString.includes("영웅") || itemString === "9") {
						return "grade3";
					} else if (itemString.includes("희귀") || itemString === "6") {
						return "grade2";
					} else if (itemString.includes("일반") || itemString === "3") {
						return "grade2";
					}
				}

				function getStoneStat(equip, ItemCode) {
					const itemObject = getItemObject(equip, ItemCode);
					if (itemObject === undefined) {
						return {};
					}
					let stoneStatString: string;
					if (itemObject["Element_005"]["value"]["Element_000"].includes("세공 단계 보너스")) {
						stoneStatString = itemObject["Element_006"]["value"]["Element_001"];
					} else {
						stoneStatString = itemObject["Element_005"]["value"]["Element_001"];
					}

					const result = stoneStatString.match(/\+(\d+)/gm);
					for (let idx = 0, len = result.length; idx < len; idx++) {
						result[idx] = result[idx].replace("+", "");
					}

					return {
						buffFirst: result[0],
						buffSecond: result[1],
						debuff: result[2],
					};
				}

				function getEngrave(engrave, order) {
					const engraveObject = getItemObject(engrave, order);
					if (engraveObject === undefined) {
						return {};
					}
					const stat = engraveObject["Element_002"]["value"].match(/>(\d+)/gm)[0].replace(">", "");
					return {
						name: engraveObject["Element_000"]["value"],
						stat: "+" + stat,
						icon:
							"/images/engrave/" +
							String(engraveList[engraveObject["Element_000"]["value"]]).padStart(3, "0") +
							".png",
						tier: getTier(stat),
					};
				}

				function getActiveEngraveArray() {
					const nodeArray = document.querySelectorAll(
						"#profile-ability > div.profile-ability-engrave > div > div.swiper-wrapper > ul > * > span",
					);
					const engraveArray = [];
					for (let idx = 0, len = nodeArray.length; idx < len; idx++) {
						engraveArray[idx] = {
							name: nodeArray[idx]["innerText"],
							icon:
								"/images/engrave/" +
								String(engraveList[nodeArray[idx]["innerText"].split(" Lv")[0]]).padStart(3, "0") +
								".png",
						};
					}

					return engraveArray;
				}

				if (this["$"] === undefined) {
					return null;
				}

				const profile = this["$"]["Profile"];
				const equip = profile["Equip"];
				const engrave = profile["Engrave"];

				return {
					activeEngrave: getActiveEngraveArray(),
					characterName: document.querySelector(selector.characterName)["innerText"],
					server: document.querySelector(selector.server)["innerText"].replace("@", ""),
					guild: document.querySelector(selector.guild)["innerText"],
					characterClass: document.querySelector(selector.characterClass)["alt"],
					characterTitle: document.querySelector(selector.characterTitle)["innerText"],
					level: document.querySelector(selector.level)["innerText"],
					itemLevel: document.querySelector(selector.itemLevel)["innerText"],
					expeditionLevel: document.querySelector(selector.expeditionLevel)["innerText"],
					duelLevel: document.querySelector(selector.duelLevel)["innerText"],
					possessionLevel:
						document.querySelector(selector.possessionLevelFirst)["innerText"] +
						document.querySelector(selector.possessionLevelSecond)["innerText"],

					combatPower: document.querySelector(selector.combatPower)["innerText"],
					healthPoint: document.querySelector(selector.healthPoint)["innerText"],

					criticalScore: document.querySelector(selector.criticalScore)["innerText"],
					specializationScore: document.querySelector(selector.specializationScore)["innerText"],
					suppressScore: document.querySelector(selector.suppressScore)["innerText"],
					speedScore: document.querySelector(selector.speedScore)["innerText"],
					patienceScore: document.querySelector(selector.patienceScore)["innerText"],
					skilledScore: document.querySelector(selector.skilledScore)["innerText"],

					intelligence: document.querySelector(selector.intelligence)["innerText"],
					courage: document.querySelector(selector.courage)["innerText"],
					charming: document.querySelector(selector.charming)["innerText"],
					kindness: document.querySelector(selector.kindness)["innerText"],

					island: document.querySelector(selector.island)["innerText"],
					star: document.querySelector(selector.star)["innerText"],
					heart: document.querySelector(selector.heart)["innerText"],
					picture: document.querySelector(selector.picture)["innerText"],
					mokoko: document.querySelector(selector.mokoko)["innerText"],
					expedition: document.querySelector(selector.expedition)["innerText"],
					ignea: document.querySelector(selector.leaf)["innerText"],
					leaf: document.querySelector(selector.leaf)["innerText"],

					hat: getItem(equip, StaticKey.hat),
					top: getItem(equip, StaticKey.top),
					bottom: getItem(equip, StaticKey.bottom),
					gloves: getItem(equip, StaticKey.gloves),
					shoulder: getItem(equip, StaticKey.shoulder),
					weapon: getItem(equip, StaticKey.weapon),
					necklace: getItem(equip, StaticKey.necklace),
					earringOne: getItem(equip, StaticKey.earringOne),
					earringTwo: getItem(equip, StaticKey.earringTwo),
					ringOne: getItem(equip, StaticKey.ringOne),
					ringTwo: getItem(equip, StaticKey.ringTwo),
					abilityStone: getItem(equip, StaticKey.abilityStone),
					abilityStoneStat: getStoneStat(equip, StaticKey.abilityStone),
					bracelet: getItem(equip, StaticKey.bracelet),

					engravement: { first: getEngrave(engrave, "000"), second: getEngrave(engrave, "001") },
				};
			},
			StaticKey,
			selector,
			engraveList,
		);

		return profileData;
	}
}
