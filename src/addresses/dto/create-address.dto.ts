import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNumber()
  streetNumber: number;

  @ApiProperty()
  @IsNumber()
  postalCode: number;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  telephone: string;
}
