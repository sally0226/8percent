import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateAccountRes } from 'src/domain/account/dto/createAccountRes.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        // TypeOrmModule.forRoot(SQLiteConfig)
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let token;
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/users/signin')
      .expect(201)
      .send({
        userId: "test",
        password: "test"
      })
      .expect(res => {
          token = res.body.token;
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .expect(201)
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "test"
      })
      .expect(res => {
          expect(res.body).toHaveProperty("accountNum");
          expect(res.body).toHaveProperty("balance");
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("createdAt");
      });
  });
});
