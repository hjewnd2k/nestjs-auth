import { IsNotEmpty, IsString } from 'class-validator';

export class cityDto {
  @IsNotEmpty()
  @IsString()
  city_name: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;
}
