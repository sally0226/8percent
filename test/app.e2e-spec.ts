import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { CreateAccountRes } from "src/domain/account/dto/createAccountRes.dto";
import {
	factory,
	setConnectionOptions,
	useRefreshDatabase,
	useSeeding
} from "typeorm-seeding";
import { Account } from "src/domain/entities/account.entity";
import { User } from "src/domain/entities/user.entity";
import { History } from "src/domain/entities/history.entity";
import { Connection } from "typeorm";
// jest.setTimeout(3000000);
jest.useFakeTimers("legacy");
describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	let connection: Connection;
	beforeAll(async (done) => {
		// setConnectionOptions({
		// 	type: "sqlite",
		// 	database: ":memory:",
		// 	entities: [User, History, Account]
		// });
		connection = await useRefreshDatabase();
		await useSeeding();
		done();
	});

	test("Should create a user with the entity factory", async (done) => {
		const createdUser = await factory(User)().create();
		const user = await connection.getRepository(User).findAndCount();
		console.log(user);
		done();
	});

	// let token;
	// it('/ (GET)', () => {
	//   return request(app.getHttpServer())
	//     .post('/users/signin')
	//     .expect(201)
	//     .send({
	//       userId: "test",
	//       password: "test"
	//     })
	//     .expect(res => {
	//         token = res.body.token;
	//     });
	// });

	// it('/ (GET)', () => {
	//   return request(app.getHttpServer())
	//     .post('/accounts')
	//     .expect(201)
	//     .set("Authorization", `Bearer ${token}`)
	//     .send({
	//       password: "test"
	//     })
	//     .expect(res => {
	//         expect(res.body).toHaveProperty("accountNum");
	//         expect(res.body).toHaveProperty("balance");
	//         expect(res.body).toHaveProperty("userId");
	//         expect(res.body).toHaveProperty("createdAt");
	//     });
	// });
});
