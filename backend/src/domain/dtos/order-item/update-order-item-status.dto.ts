import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderItemStatusDto {
  @IsNotEmpty()
  @IsString()
  orderItemId: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
