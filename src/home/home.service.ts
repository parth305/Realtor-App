import { Injectable } from '@nestjs/common';
import { HomeResponseDTO } from 'src/dtos/home.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes() {
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
    });

    return homes.map((home) => new HomeResponseDTO(home));
  }
}
