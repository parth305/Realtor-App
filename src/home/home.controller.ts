import { Body, Controller, Delete, Get, Param, BadRequestException, ParseIntPipe, Post, Put,Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { PropertyType } from '@prisma/client';
import { CreateHomeDTO, UpdateHomeDTO } from 'src/dtos/home.dto';
import { User, UserInfo } from 'src/decorators/user.decorator';

@Controller('home')
export class HomeController {

    constructor(private readonly homeService: HomeService){}
    @Get()
    getHomes(
        @Query("city") city?:string,
        @Query("maxPrice") maxPrice?:string,
        @Query("minPrice") minPrice?:string,
        @Query("propertyType") propertyType?:PropertyType,
    ){

        const price=maxPrice || minPrice?{
            ...(maxPrice &&{lte:parseFloat(maxPrice)}),
            ...(minPrice &&{gte:parseFloat(minPrice)})
        }:undefined

        const Filters={
            ...(city &&{city}),
            ...(price && {price}),
          ...(propertyType && {propertyType})
        } 

        return this.homeService.getHomes(Filters);
    }

    @Get(":id")
    getHomeById(@Param("id",ParseIntPipe) id:number){
        return this.homeService.getHomeById(id);
    }

    @Post()
    createHome(@Body() body:CreateHomeDTO,@User() user:UserInfo){
        return this.homeService.createHome(body,user.id);
    }

    @Put(":id")
    async updateHome(
        @Param("id",ParseIntPipe) id:number,
        @Body() body:UpdateHomeDTO,
        @User() user:UserInfo
    ){
        const realtorId=await this.homeService.getRealtorByHomeId(id);

        if(user.id!==realtorId){
            throw new BadRequestException()
        }
        return this.homeService.updateHome(id,body);
    }

    @Delete(":id")
    async deleteHome(@Param("id",ParseIntPipe) id:number,
    @User() user:UserInfo){
        const realtorId=await this.homeService.getRealtorByHomeId(id);

        if(user.id!==realtorId){
            throw new BadRequestException()
        }
        return this.homeService.deleteHomeById(id);
    }
}
