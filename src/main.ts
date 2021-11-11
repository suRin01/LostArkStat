import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
	const httpsOptions = {
		key: fs.readFileSync(join(__dirname, "..", "certification/privkey1.pem")),
		cert: fs.readFileSync(join(__dirname, "..", "certification/cert1.pem")),
	};

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions,
	});

	// whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
	// forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
	// transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useStaticAssets(join(__dirname, "..", "public"));
	app.setBaseViewsDir(join(__dirname, "..", "views"));

	app.setViewEngine("hbs");

	await app.listen(443, "0.0.0.0");
}
bootstrap();

// https://1drv.ms/u/s!Ajg9s_4mZeFglU3HdZ2kYjZztQDL
// 테이블 구조 정리, 이후 페이지 작동 절차 정리

// https://lostark.game.onstove.com/Profile/Character/1%EB%8C%80%EB%8C%80%EB%8B%B9%EC%A7%81%EC%82%AC%EB%A0%B9 공식 홈페이지
// $.Profile => dom이하 데이터 저장된 오브젝트, 모든 데이터 끌어오기 가능
