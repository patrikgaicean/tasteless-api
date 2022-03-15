import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscsService } from './discs.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';

@Controller('discs')
@ApiTags('discs')
export class DiscsController {
  constructor(private readonly discsService: DiscsService) {}

  @Post()
  async create(@Body() discData: CreateDiscDto) {
    return this.discsService.create(discData);
  }

  @Get()
  async findAll() {
    return this.discsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.discsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.discsService.remove(+id);
  }
}
