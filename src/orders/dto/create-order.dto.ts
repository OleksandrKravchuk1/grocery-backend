import { IsNumber, IsPositive, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @IsNumber()
  @IsPositive({ message: "Total price cannot be negative!" })
  totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
