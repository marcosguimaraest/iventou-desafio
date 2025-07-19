import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalInCents: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
