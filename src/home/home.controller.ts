import { Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Put,Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { PropertyType } from '@prisma/client';

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
    createHome(){

    }

    @Put(":id")
    updateHome(){
        return {}
    }

    @Delete(":id")
    deleteHome(){
        return {}
    }
}
