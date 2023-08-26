import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { InquireResponse } from 'src/dtos/message.dto';
import { HomeService } from 'src/home/home.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(private readonly prismaService:PrismaService,private readonly homeService:HomeService){}

   async inquire(homeId:number,buyerId:number,message:string){
    //    console.time("Timer")
        const realtorId=await this.homeService.getRealtorByHomeId(homeId);
        // console.timeLog("Timer")

        const data=await this.prismaService.message.create({
            data:{
                realtor_id:realtorId,
                home_id:homeId,
                buyer_id:buyerId,
                message:message
            }
        })

        // console.timeLog("Timer")

        return new InquireResponse(data)
    }

    async getMessage(homeId,userId){
        const realtorId=await this.homeService.getRealtorByHomeId(homeId);

        if (realtorId!==userId){
            throw new UnauthorizedException()
        }

        const messages=await this.prismaService.message.findMany({
            where:{
                realtor_id:realtorId
            },
            select:{
                message:true,
                id:true,
                home:{
                    select:{
                        address:true,
                        city:true,
                        images:{
                            select:{
                                url:true
                            }
                        },
                        number_of_bathrooms:true,
                        number_of_bedrooms:true,
                        land_size:true,
                        price:true
                    }
                },
                buyer:{
                    select:{
                        name:true,
                        email:true,
                        phone:true,
                    }
                }
                
            }
        })

        return messages;
    }
}
