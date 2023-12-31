import {
  CanActivate,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload{
    id:number,
    iat:number,
    exp:number
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,private readonly prismaService:PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles) {
      const request = context.switchToHttp().getRequest();

      const token = request.headers.authorization?.split('Bearer ')[1];
      try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

        const user=await this.prismaService.user.findUnique({
            where:{
               id: payload.id
            }
        })

        if (!user) {
            return false
        }

        if (!roles.includes(user.user_type)) {
            return false
        }
        
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    return true;
  }
}


// REaltor

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY5MzAzNDcwMiwiZXhwIjoxNjkzNjM5NTAyfQ.rCs589oO0kIe23OcLB0-NBbWXWtJLlvPIDYO4gdkAT8

// bUYER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY5MzAzNDY2MywiZXhwIjoxNjkzNjM5NDYzfQ.JHEBHrW4ry_qoB6rNC2Yk5wAfk2JtRv0XnuT9Tdh2Mw