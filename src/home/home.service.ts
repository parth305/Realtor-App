import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { HomeResponseByIdDTO, HomeResponseDTO } from 'src/dtos/home.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface getHomesFilters {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyType?: PropertyType;
}

interface CreateHomeParams {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  price: number;
  landSize: number;
  propertyType: PropertyType;
  images: { url: string }[];
}

interface UpdateHomeParams {
  address?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  city?: string;
  price?: number;
  landSize?: number;
  propertyType?: PropertyType;
}

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes(filters: getHomesFilters) {
    if (
      filters.propertyType &&
      !Object.values(PropertyType).includes(filters.propertyType)
    ) {
      throw new BadRequestException('Invalid propertyType value.');
    }

    const homes = await this.prismaService.home.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        propertyType: true,
        number_of_bathrooms: true,
        number_of_bedrooms: true,
        listed_date: true,
        land_size: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filters,
    });

    if (!homes.length) {
      throw new NotFoundException();
    }

    return homes.map((home) => new HomeResponseDTO(home));
  }

  async getHomeById(id: number): Promise<HomeResponseByIdDTO> {
    const home = await this.prismaService.home.findUnique({
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        propertyType: true,
        number_of_bathrooms: true,
        number_of_bedrooms: true,
        listed_date: true,
        land_size: true,
        images: {
          select: {
            url: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (!home) {
      throw new NotFoundException();
    }

    return new HomeResponseByIdDTO(home);
  }

  async createHome({
    address,
    city,
    images,
    landSize,
    numberOfBathrooms,
    numberOfBedrooms,
    price,
    propertyType,
  }: CreateHomeParams,userId:number) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        city,
        number_of_bathrooms: numberOfBathrooms,
        number_of_bedrooms: numberOfBedrooms,
        price,
        propertyType,
        land_size: landSize,
        realtor_id: userId,
      },
    });

    const homeImages = images.map((element) => {
      return { ...element, home_id: home.id };
    });

    const CreateImages = await this.prismaService.image.createMany({
      data: homeImages,
    });

    return new HomeResponseDTO({ ...home, images: homeImages });
  }

  async updateHome(id: number, data: UpdateHomeParams) {
    const HomeExists = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!HomeExists) {
      throw new NotFoundException();
    }
    
    const home = await this.prismaService.home.update({
      where: {
        id,
      },
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        propertyType: true,
        number_of_bathrooms: true,
        number_of_bedrooms: true,
        listed_date: true,
        land_size: true,
        images: {
          select: {
            url: true,
          },
        },
      },
      data,
    });
    
    return new HomeResponseDTO(home);
  }
  
  async deleteHomeById(id: number){
    const HomeExists = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!HomeExists) {
      throw new NotFoundException();
    }    


    await this.prismaService.image.deleteMany({
      where:{
        home_id:id
      }
    })

    await this.prismaService.home.delete({
      where:{
        id
      }
    })
  }

  async getRealtorByHomeId(id:number){

    const home=await this.prismaService.home.findUnique({
      where:{
        id
      },
      select:{
        realtor_id:true
      }
    })

    if (!home) {
      throw new NotFoundException();
    }

    return home.realtor_id;
  }
}
