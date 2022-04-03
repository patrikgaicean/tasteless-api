import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  discId: number;

  @ApiProperty()
  @IsString()
  condition: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  price: number;
}
