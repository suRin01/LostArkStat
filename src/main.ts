import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
	// const httpsOptions = {
	// 	key: fs.readFileSync(join(__dirname, "..", "certification/privkey1.pem")),
	// 	cert: fs.readFileSync(join(__dirname, "..", "certification/cert1.pem")),
	// };

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		// httpsOptions,
	});

	app.enableCors({
		origin: "http://localhost:8080",
		credentials: true
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


	
	await app.listen(8080, "0.0.0.0");
}
bootstrap();