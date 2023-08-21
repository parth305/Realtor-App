import {
  ConflictException,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserType } from '@prisma/client';
import { UserResponse } from 'src/dtos/user.dto';

interface SignupParams {
  name: string;
  phone: string;
  password: string;
  email: string;
}

interface SigninParams {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async Signup(
    { email, name, password, phone }: SignupParams,
    userType: UserType,
  ) {
    const userExsts = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExsts) {
      throw new ConflictException('User already exists');
    }

    const userPhoneExists = await this.prismaService.user.findUnique({
      where: { phone },
    });

    if (userPhoneExists) {
      throw new ConflictException('Phone Number Already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        user_type: userType,
      },
    });

    const token = await this.generateJWT(user.id);

    return { token };
  }

  async Signin({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid Creadentials');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const token = await this.generateJWT(user.id);
      return { token };
    }

    throw new BadRequestException('Invalid Creadentials');
  }

  private generateJWT(id: Number) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600 * 24,
    });
  }

  async generateProductKey(email: string, userType: UserType) {
    const str = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return await bcrypt.hash(str, 10);
  }

  async me(id:number){
    const user=await this.prismaService.user.findUnique({
      where:{
        id
      }
    })

    if(!user){
      throw new NotFoundException();
    }

    return new UserResponse(user);
  }
}
