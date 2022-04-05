import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsNumber } from "class-validator";
import { PaymentMethod, ShippingMethod } from "./interfaces";

export class CreateOrderDto {
  @ApiProperty()
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  orderDate: string;

  @ApiProperty()
  @IsNumber()
  addressId: number;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[]

  @ApiProperty()
  @IsEnum(ShippingMethod)
  shippingType: ShippingMethod;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
