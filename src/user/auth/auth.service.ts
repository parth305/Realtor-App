import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {UserType} from "@prisma/client";

interface User {
  name: string;
  phone: string;
  password: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ email, name, password, phone}: User) {
    const userExsts = await this.prismaService.user.findUnique({ where: { email } });


    if (userExsts){
        throw new ConflictException("User already exists");
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await this.prismaService.user.create({
        data:{
            email,
            name,
            password:hashedPassword,
            phone,
            user_type:UserType.ADMIN
        }
    })

    const token=await jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:3600*24})

    return {token};
  }
}
