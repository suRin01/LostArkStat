import type { Browser } from "puppeteer";
import { Injectable } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";
import { StaticKey } from "src/common/staticKey";
import { selector } from "src/common/querySelector";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private readonly browser: Browser) {}

	async getData(id: string): Promise<any> {
		const page = await this.browser.newPage();

		console.log("https://lostark.game.onstove.com/Profile/Character/" + id);

		await page.goto(
			"https://lostark.game.onstove.com/Profile/Character/" + id,
		);

		const profileData = await page.evaluate(
			(StaticKey, selector) => {
				function getItem(equip, ItemCode) {
					const key = Object.getOwnPropertyNames(equip)[0].slice(
						0,
						8,
					);

					const itemObject = equip[key + "_" + ItemCode];
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
							itemObject["Element_001"]["value"]["slotData"][
								"iconPath"
							],
						name: itemObject["Element_000"]["value"]
							.replace(/<[^>]*>/gm, " ")
							.trim(),
						tier: getTier(
							itemObject["Element_001"]["value"]["leftStr0"],
						),
					};
				}

				function getTier(itemString: string): string {
					if (itemString.includes("유물")) {
						return "grade5";
					} else if (itemString.includes("전설")) {
						return "grade4";
					} else if (itemString.includes("영웅")) {
						return "grade3";
					} else if (itemString.includes("희귀")) {
						return "grade2";
					} else if (itemString.includes("일반")) {
						return "grade2";
					}
				}

				function getStoneStat(stoneStatString: string) {
					// const result = stoneStatString.
				}

				if (this["$"] === undefined) {
					return null;
				}

				const equip = this["$"]["Profile"]["Equip"];

				return {
					characterName: document.querySelector(
						selector.characterName,
					)["innerText"],
					server: document
						.querySelector(selector.server)
						["innerText"].replace("@", ""),
					guild: document.querySelector(selector.guild)["innerText"],
					characterClass: document.querySelector(
						selector.characterClass,
					)["alt"],
					characterTitle: document.querySelector(
						selector.characterTitle,
					)["innerText"],
					level: document.querySelector(selector.level)["innerText"],
					itemLevel: document.querySelector(selector.itemLevel)[
						"innerText"
					],
					expeditionLevel: document.querySelector(
						selector.expeditionLevel,
					)["innerText"],
					duelLevel: document.querySelector(selector.duelLevel)[
						"innerText"
					],
					possessionLevel:
						document.querySelector(selector.possessionLevelFirst)[
							"innerText"
						] +
						document.querySelector(selector.possessionLevelSecond)[
							"innerText"
						],

					island: document.querySelector(selector.island)[
						"innerText"
					],
					star: document.querySelector(selector.star)["innerText"],
					heart: document.querySelector(selector.heart)["innerText"],
					picture: document.querySelector(selector.picture)[
						"innerText"
					],
					mokoko: document.querySelector(selector.mokoko)[
						"innerText"
					],
					expedition: document.querySelector(selector.expedition)[
						"innerText"
					],
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
					bracelet: getItem(equip, StaticKey.bracelet),
				};
			},
			StaticKey,
			selector,
		);

		console.log(profileData);

		return profileData;
	}
}
