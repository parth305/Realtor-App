import {
  Controller,
  Post,
  Body,
  Param,
  UnauthorizedException,
  ParseEnumPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  GenerateProductKeyDTO,
  UserSigninDTO,
  UserSignupDTO,
} from 'src/dtos/user.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { User, UserInfo } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async Signup(
    @Body() body: UserSignupDTO,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const str = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(str, body.productKey);

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }

    return this.authService.Signup(body, userType);
  }

  @Post('/signin')
  Singin(@Body() body: UserSigninDTO) {
    return this.authService.Signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() body: GenerateProductKeyDTO) {
    return this.authService.generateProductKey(body.email, body.userType);
  }

  @Get("/me")
  me(@User() user:UserInfo){
    return this.authService.me(user.id);
  }
}
