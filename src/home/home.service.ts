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
}
