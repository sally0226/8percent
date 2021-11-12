import { Test, TestingModule } from '@nestjs/testing';
import { Account } from '../entities/account.entity';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

const mockRepository = {
  createOne: jest.fn(async (accountNum, password) => {
    const result = new Account;
    result.accountNum = accountNum;
    result.password = password;
    return Promise.resolve(result);
  }),
  get: jest.fn()
}


describe('Account Service', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService,
        {
          provide: AccountRepository,
          useValue: mockRepository
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('계좌번호를 자동으로 생성', async () => {
    const user = "";
    const password = "test";
    const result = await service.create(user, password);

    const reg = /(\d{6})-(\d{2})-(\d{6})/;
    expect(result.accountNum).toMatch(reg);
  })

});