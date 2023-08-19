import { IsString,IsPhoneNumber,IsStrongPassword,IsEnum,IsNotEmpty ,IsEmail} from "class-validator";


enum UserType{
    BUYER="BUYER",
    REALTOR="REALTOR",
    ADMIN="ADMIN"
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

    @IsEnum(UserType)
    user_type:string;

}
