import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class CreateWishlistDto {
  @ApiProperty()
  @IsNumber()
  discId: number;
}
