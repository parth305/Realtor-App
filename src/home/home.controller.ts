import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {

    constructor(private readonly homeService: HomeService){}
    @Get()
    getHomes(){
        return this.homeService.getHomes();
    }

    @Get(":id")
    getHomeById(){
        return {}
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
