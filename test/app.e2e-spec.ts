import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@root/app.module";

describe("UserController (e2e)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	let token = "";
	it("/users/signup (POST)", () => {
		return request(app.getHttpServer())
			.post("/users/signup")
			.expect(201)
			.send({
				userId: "test",
				password: "test",
				userName: "test"
			});
			// .expect((res) => {
			// 	token = res.body.token;
			// });
	});
	it("/users/signin (POST)", () => {
		return request(app.getHttpServer())
			.post("/users/signin")
			.expect(201)
			.send({
				userId: "test",
				password: "test"
			})
			.expect((res) => {
				console.log(token);
				token = res.body.token;
			});
	});

	it("/ (GET)", () => {
		console.log(token);
		return request(app.getHttpServer())
			.post("/accounts")
			.expect(201)
			.set("Authorization", `Bearer ${token}`)
			.send({
				password: "test"
			})
			.expect((res) => {
				console.log(res.body);
				expect(res.body).toHaveProperty("accountNum");
				expect(res.body).toHaveProperty("balance");
				expect(res.body).toHaveProperty("userId");
				expect(res.body).toHaveProperty("createdAt");
			});
	});
});
