import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscsService } from './discs.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';

@Controller('discs')
export class DiscsController {
  constructor(private readonly discsService: DiscsService) {}

  @Post()
  create(@Body() createDiscDto: CreateDiscDto) {
    return this.discsService.create(createDiscDto);
  }

  @Get()
  findAll() {
    return this.discsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscDto: UpdateDiscDto) {
    return this.discsService.update(+id, updateDiscDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discsService.remove(+id);
  }
}
