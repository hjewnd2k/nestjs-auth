import { IsNotEmpty, IsString } from 'class-validator';

export class HotelDto {
  @IsNotEmpty()
  @IsString()
  hotel_name: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  company_id: string;
  @IsNotEmpty()
  city_id: string;
  @IsNotEmpty()
  category_id: string;
  is_active: boolean;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsString()
  images: string[];
}

export interface HotelUpdateDto {
  id: string;
  hotel_name?: string;
  description?: string;
  company_id?: string;
  city_id?: string;
  category_id?: string;
  is_active?: boolean;
  address?: string;
  images?: string[];
}
