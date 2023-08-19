import { IsString,IsPhoneNumber,IsStrongPassword,IsEnum,IsNotEmpty ,IsEmail, IsOptional} from "class-validator";


enum UserType{
    BUYER="BUYER",
    REALTOR="REALTOR",
    ADMIN="ADMIN"
  }


  export class UserSigninDTO{

    @IsEmail()
    @IsString()
    email:string;

    @IsStrongPassword()
    password:string;
  }

export class UserSignupDTO{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsPhoneNumber("IN")
    phone:string;

    @IsEmail()
    email:string;

    @IsStrongPassword()
    password:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productKey?:string;
}


export class GenerateProductKeyDTO{

  @IsEmail()
  email:string;

  @IsEnum(UserType)
  userType:UserType;
}