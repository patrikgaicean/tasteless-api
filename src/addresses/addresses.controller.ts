import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
@ApiTags('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUserDto, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllForUser(@Req() req: RequestWithUserDto) {
    return this.addressesService.findAllForUser(req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: RequestWithUserDto, @Param('id') id: string) {
    return this.addressesService.removeForUser(+id, req.user.userId);
  }
  
}
