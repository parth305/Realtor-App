import { PropertyType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

interface HomeResponse {
  id: number;
  address: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  city: string;
  listed_date: Date;
  price: number;
  land_size: number;
  propertyType: PropertyType;
  images: {
    url: string;
  }[];
}

export class HomeResponseDTO {
  constructor(partial: HomeResponse) {
    Object.assign(this, partial);
  }

  @Exclude()
  number_of_bedrooms: number;

  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms: number;

  @Expose({ name: 'numberOfBathrooms' })
  numberofBathrooms() {
    return this.number_of_bathrooms;
  }
  
  @Exclude()
  listed_date: Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  @Exclude()
  land_size: number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  realtor_id: number;

  @Exclude()
  images: { url: string }[];

  @Expose({ name: 'image' })
  image() {
    return this.images[0].url;
  }
}

export class HomeResponseByIdDTO {
  constructor(partial: HomeResponse) {
    Object.assign(this, partial);
  }

  @Exclude()
  number_of_bedrooms: number;

  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms: number;

  @Expose({ name: 'numberOfBathrooms' })
  numberofBathrooms() {
    return this.number_of_bathrooms;
  }
  
  @Exclude()
  listed_date: Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  @Exclude()
  land_size: number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  realtor_id: number;

}