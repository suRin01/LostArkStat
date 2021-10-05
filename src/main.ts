import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
}
bootstrap();

// https://1drv.ms/u/s!Ajg9s_4mZeFglU3HdZ2kYjZztQDL
// 테이블 구조 정리, 이후 페이지 작동 절차 정리
