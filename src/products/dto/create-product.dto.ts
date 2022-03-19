import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  discId: number;

  @ApiProperty()
  @IsString()
  condition: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
