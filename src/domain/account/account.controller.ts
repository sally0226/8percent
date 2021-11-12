import { Body, Controller, Post } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { AccountService } from './account.service';
// import { CreateAccountReq } from './dto/createAccountReq.dto';

@Controller('accounts')
export class AccountController {
    constructor(private accountService: AccountService) {}
    
    @Post()
    create(user, @Body() body): Promise<Account> {
        return this.accountService.create(user,body.password);
    }
}
