import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, Min } from "class-validator";
import { Condition } from "./interfaces";

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  discId: number;

  @ApiProperty()
  @IsEnum(Condition)
  condition: Condition;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  price: number;
}
