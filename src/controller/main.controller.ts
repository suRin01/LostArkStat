import { Get, Controller, Render } from "@nestjs/common";

@Controller("/")
export class MainController {
	// constructor() {}

	@Get()
	@Render("index")
	loginPage() {
		return { message: "hello" };
	}

	@Get("/character/:id")
	@Render("character")
	character() {
		return;
	}
}
