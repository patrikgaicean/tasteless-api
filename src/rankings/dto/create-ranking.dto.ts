import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Max, Min } from "class-validator";

export class CreateRankingDto {
  @ApiProperty()
  @IsNumber()
  discId: number;

  @ApiProperty()
  @IsInt()
  @Max(5)
  @Min(0)
  rank: number;
}
