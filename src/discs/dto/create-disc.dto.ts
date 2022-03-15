import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsISO8601, IsNotEmpty, IsString, Matches, ValidateNested } from "class-validator";

export class CreateDiscDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty()
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genre: string; // TODO change to enum

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Matches(/[A-Z][\d] [- a-zA-Z\d]+/, { each: true })
  trackList: string[];
}
