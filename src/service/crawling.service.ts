import type { Browser } from "puppeteer";
import { Injectable } from "@nestjs/common";
import { InjectBrowser } from "nest-puppeteer";

@Injectable()
export class CrawlingService {
	constructor(@InjectBrowser() private readonly browser: Browser) {}

	async getData(id: string): Promise<any> {
		const page = await this.browser.newPage();

		console.log("https://lostark.game.onstove.com/Profile/Character/" + id);

		await page.goto(
			"https://lostark.game.onstove.com/Profile/Character/" + id,
		);

		const profileData = await page.evaluate(() => {
			if (this["$"] === undefined) {
				return null;
			}
			return {
				characterName: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-character-info > span.profile-character-info__name",
				)["innerText"],
				server: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-character-info > span.profile-character-info__server",
				)["innerText"],
				guild: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__guild > span:nth-child(2)",
				)["innerText"],
				characterClass: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-character-info > img",
				)["alt"],
				characterTitle: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__title > span:nth-child(2)",
				)["innerText"],
				level: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info > div.level-info__item > span:nth-child(2)",
				)["innerText"],
				itemLevel: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)",
				)["innerText"],
				expeditionLevel: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info > div.level-info__expedition > span:nth-child(2)",
				)["innerText"],
				duelLevel: document.querySelector(
					"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.level-info__pvp > span:nth-child(2)",
				)["innerText"],
				possessionLevel:
					document.querySelector(
						"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__wisdom > span:nth-child(2)",
					)["innerText"] +
					document.querySelector(
						"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__wisdom > span:nth-child(3)",
					)["innerText"],

				island: document.querySelector(
					"#lui-tab1-1 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				star: document.querySelector(
					"#lui-tab1-2 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				heart: document.querySelector(
					"#lui-tab1-3 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				picture: document.querySelector(
					"#lui-tab1-4 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				mokoko: document.querySelector(
					"#lui-tab1-5 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				expedition: document.querySelector(
					"#lui-tab1-6 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				ignea: document.querySelector(
					"#lui-tab1-7 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
				leaf: document.querySelector(
					"#lui-tab1-8 > div > div.collection-list > div > p > span.now-count",
				)["innerText"],
			};
		});

		console.log(profileData);

		return profileData;
	}
}
