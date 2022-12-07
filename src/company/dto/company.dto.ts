import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class companyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city_id: string;

  @IsNotEmpty()
  @IsString()
  company_address: string;

  @IsString()
  details: string;
  is_active: boolean;
}
