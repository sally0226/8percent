import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../auth/dto/jwtPayload.dto';
import { JwtGuard } from '../auth/guards/jwtGuard.guard';
import { ParamUser } from '../auth/user.decorator';
import { Account } from '../entities/account.entity';
import { AccountService } from './account.service';
import { CreateAccountReq } from './dto/createAccountReq.dto';
import { CreateAccountRes } from './dto/createAccountRes.dto';

@Controller('accounts')
@UseGuards(JwtGuard)
export class AccountController {
    constructor(private accountService: AccountService) {}
    
    @Post()
    create(@ParamUser() user: JwtPayload ,@Body() body: CreateAccountReq): Promise<CreateAccountRes> {
        return this.accountService.create(user,body.password);
    }
}
