import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  orderDate: string;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[]
}
