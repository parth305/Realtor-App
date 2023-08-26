import { Body, Controller, Param, ParseIntPipe, Post,Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { User, UserInfo } from 'src/decorators/user.decorator';
import { InquireDTO } from 'src/dtos/message.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from '@prisma/client';

@Controller('message')
export class MessageController {
    constructor (private readonly messageService:MessageService ){}

    @Roles(UserType.BUYER)
    @Post(":id")
    inquire(
        @Param("id",ParseIntPipe) homeId:number,
        @User() user:UserInfo,
        @Body() body:InquireDTO
    ){
        return this.messageService.inquire(homeId,user.id,body.message)
    }

    @Roles(UserType.REALTOR)
    @Get(":id")
    getMessages(
        @Param("id",ParseIntPipe) homeId:number,
        @User() userInfo:UserInfo,
    ){
        return this.messageService.getMessage(homeId,userInfo.id)
    }
}
