import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { DiscsService } from './discs.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { Express } from 'express';
import { FileUploadDto } from '../files/dto/file-upload.dto';

@Controller('discs')
@ApiTags('discs')
export class DiscsController {
  constructor(private readonly discsService: DiscsService) {}

  @Post()
  async create(@Body() discData: CreateDiscDto) {
    return this.discsService.create(discData);
  }

  @Post('files')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadImage(@Body() _: FileUploadDto, @UploadedFile() file: Express.Multer.File) {
    return this.discsService.uploadImage(file.buffer, file.originalname);
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
