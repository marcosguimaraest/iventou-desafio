import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
