import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDTO } from 'src/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  Signup(@Body() body: UserSignupDTO) {
    console.log(body);

    return this.authService.signup(body);
  }
}
