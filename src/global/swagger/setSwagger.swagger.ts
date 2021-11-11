import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle("8Percent API Docs")
		.setDescription("8퍼센트 과제 API 문서입니다.")
		.setVersion("1.0")
		.addTag("8Percent")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
}
