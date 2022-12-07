import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDtoSignup {
  @IsString()
  frist_name: string;

  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Password has to be at between 3 and 20 characters',
  })
  password: string;
}

export class AuthDtoSignin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Password has to be at between 3 and 20 characters',
  })
  password: string;
}
