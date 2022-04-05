import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsString, Matches } from "class-validator";
import { Genre } from "./interfaces";

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
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsArray()  
  @IsNotEmpty()
  @Matches(/[A-Z][\d]{1,2} .+/, { each: true })
  trackList: string[];
}
