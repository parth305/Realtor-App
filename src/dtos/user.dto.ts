import { UserType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  IsStrongPassword,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UserSigninDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class UserSignupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPhoneNumber('IN')
  phone: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

export class GenerateProductKeyDTO {
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}

interface UserRes {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  user_type: UserType;
}

export class UserResponse {
  constructor(partial: UserRes) {
    Object.assign(this, partial);
  }

  @Exclude()
  password: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  @Exclude()
  user_type: UserType;

  @Expose({ name: 'userType' })
  userType() {
    return this.user_type;
  }
}
