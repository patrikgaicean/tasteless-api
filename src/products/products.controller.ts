import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from '../files/dto/file-upload.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
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
    return this.productsService.uploadImages(+id, images);
  }

  @Get(':id/images')
  async getDiscImages(
    @Param('id') id: number,
  ) {
    return await this.productsService.getProductImages(+id);
  }

  @Get(':discId')
  async findAllByDiscId(@Param('discId') discId: string) {
    return this.productsService.findAllByDiscId(+discId);
  }
}
