import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateWishlistDto {
  @ApiProperty()
  @IsNumber()
  discId: number;
}
