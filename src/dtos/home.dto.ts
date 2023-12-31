import { PropertyType } from '@prisma/client';
import { Exclude, Expose ,Type} from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

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

/*
export class HomeResponseDTO {
  constructor(partial: Partial<HomeResponseDTO>) {
    Object.assign(this, partial);
  }

  id: number;
  address: string;

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
  city: string;

  @Exclude()
  listed_date: Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }
  price: number;

  @Exclude()
  land_size: number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }
  propertyType: PropertyType;

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
    return this?.images[0]?.url;
  }
}
*/
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

class Image{
  @IsString()
  @IsNotEmpty()
  url:string;
}

export class CreateHomeDTO{

  @IsString()
  @IsNotEmpty()
  address:string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms:number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms:number;

  @IsString()
  @IsNotEmpty()
  city:string;

  @IsNumber()
  @IsPositive()
  price:number;

  @IsNumber()
  @IsPositive()
  landSize:number;

  @IsEnum(PropertyType)
  propertyType:PropertyType;

  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>Image)
  images:Image[];

}

export class UpdateHomeDTO{

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?:string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBedrooms?:number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBathrooms?:number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?:string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?:number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  landSize?:number;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?:PropertyType; 
}