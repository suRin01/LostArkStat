import { Page } from "puppeteer";
import { engraveList } from "src/common/engrave";
import { AbilityStoneStat, ItemObject } from "../model/character.profile.model";
import { ElementHandle } from "puppeteer";
import { urls } from "src/common/url";

export class PageParser {
	public getItemObject(equip: Record<string, any>, ItemCode: string): Record<string, any> {
		if (equip === undefined) {
			return undefined;
		}
		const key: string = Object.getOwnPropertyNames(equip)[0].slice(0, 8);

		const itemObject = equip[key + "_" + ItemCode];
		return itemObject;
	}

	public getTier(itemString: string): string {
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

	public getStoneStat(equip: Record<string, any>, ItemCode: string): AbilityStoneStat {
		const itemObject = this.getItemObject(equip, ItemCode);
		if (itemObject === undefined) {
			return {
				buffFirst: null,
				buffSecond: null,
				debuff: null,
			};
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
	public getItem(equip: Record<string, any>, ItemCode: string): ItemObject {
		const itemObject = this.getItemObject(equip, ItemCode);
		if (itemObject === undefined) {
			return {
				icon: urls.blankImage,
				name: "",
				tier: "grade0",
				stat: null,
			};
		}

		return {
			icon: "https://cdn-lostark.game.onstove.com/" + itemObject["Element_001"]["value"]["slotData"]["iconPath"],
			name: itemObject["Element_000"]["value"].replace(/<[^>]*>/gm, " ").trim(),
			tier: this.getTier(itemObject["Element_001"]["value"]["leftStr0"]),
			stat: null,
		};
	}
	public getEngrave(engrave: Record<string, any>, order: string): ItemObject {
		const engraveObject = this.getItemObject(engrave, order);
		if (engraveObject === undefined) {
			return {
				icon: urls.blankImage,
				name: "",
				tier: "grade0",
				stat: null,
			};
		}
		const stat = engraveObject["Element_002"]["value"].match(/>(\d+)/gm)[0].replace(">", "");
		return {
			name: engraveObject["Element_000"]["value"],
			stat: "+" + stat,
			icon:
				urls.engraveImgBase +
				String(engraveList[engraveObject["Element_000"]["value"]]).padStart(3, "0") +
				".png",
			tier: this.getTier(stat),
		};
	}

	public getActiveEngraveArray(engraveNodeList: ElementHandle<Element>[]): ItemObject[] {
		const engraveArray = [];
		for (let idx = 0, len = engraveNodeList.length; idx < len; idx++) {
			engraveArray[idx] = {
				name: engraveNodeList[idx]["innerText"],
				icon:
					urls.engraveImgBase +
					String(engraveList[engraveNodeList[idx]["innerText"].split(" Lv")[0]]).padStart(3, "0") +
					".png",
				stat: null,
				tier: null,
			};
		}

		return engraveArray;
	}

	public async getInnerText(page: Page, selector: string): Promise<string> {
		return await page.$eval(selector, (pageElement) => {
			return pageElement.textContent;
		});
	}

	public async getInnerItemArray(page: Page, selector: string): Promise<ItemObject[]> {
		return await page.$$eval(
			selector,
			(pageElements, engraveList) => {
				const resultArr: ItemObject[] = [];
				for (let idx = 0, len = pageElements.length; idx < len; idx++) {
					resultArr.push({
						name: pageElements[idx].textContent,
						icon:
							urls.engraveImgBase +
							String(engraveList[pageElements[idx].textContent.split(" Lv")[0]]).padStart(3, "0") +
							".png",
						stat: null,
						tier: null,
					});
				}

				return resultArr;
			},
			engraveList,
		);
	}
}
