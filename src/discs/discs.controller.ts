import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFiles, Query, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { DiscsService } from './discs.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { FilesUploadDto } from '../files/dto/file-upload.dto';
import { DiscQuery } from './dto/query';
import { Genre } from './dto/interfaces';

@Controller('discs')
@ApiTags('discs')
export class DiscsController {
  constructor(private readonly discsService: DiscsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() discData: CreateDiscDto) {
    return this.discsService.create(discData);
  }

  @Get('/genres')
  async getGenres() {
    return this.discsService.getGenres();
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  async uploadImages(
    @Param('id') id: string,
    @Body() _: FilesUploadDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    return this.discsService.uploadImages(+id, images);
  }

  @Get(':id/images')
  @UseGuards(JwtAuthGuard)
  async getDiscImages(
    @Param('id') id: string,
  ) {
    return await this.discsService.getDiscImages(+id);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    })) query: DiscQuery
  ) {
    return this.discsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.discsService.findOne(+id);
  }

}
