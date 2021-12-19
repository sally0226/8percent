import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionHandler } from "./global/exception/ErrorHandler";
import { setSwagger } from "./global/swagger/setSwagger.swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);
	setSwagger(app);
	app.useGlobalFilters(new ExceptionHandler());
	await app.listen(3000);
}
bootstrap();
