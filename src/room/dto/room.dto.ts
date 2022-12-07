import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomTypeDto {
  @IsNotEmpty()
  @IsString()
  type_name: string;
}

interface DescriptionType {
  area: string;
  bed_type: string;
  view_type: string;
}

export class RoomDto {
  @IsNotEmpty()
  @IsString()
  room_name: string;
  @IsNotEmpty()
  description: DescriptionType;
  @IsNotEmpty()
  @IsString()
  hotel_id: string;
  @IsNotEmpty()
  @IsString()
  room_type_id: string;
  @IsNotEmpty()
  @IsNumber()
  current_price: number;
  @IsNotEmpty()
  images: string[];
}

export interface IRoomDto {
  id: string;
  room_name?: string;
  hotel_id?: string;
  description?: DescriptionType;
  room_type_id?: string;
  current_price?: number;
  images?: string[];
}
