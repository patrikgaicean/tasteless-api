import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private filesService: FilesService
  ) {}

  async create(data: CreateProductDto) {
    const entity: Product = await this.productsRepository.createProduct(this.toEntity(data));

    return this.toDto(entity);
  }

  async uploadImages(productId: number, files: Express.Multer.File[]) {
    await this.filesService.uploadImages(files, productId, 'product');
  }

  async getProductImages(productId: number) {
    const productsWithImages = await this.productsRepository.findOne(
      { product_id: productId },
      { relations: ['images'] }
    );

    if (productsWithImages) {
      return Promise.all(
        productsWithImages.images.map(async (image) => {
          const url = await this.filesService.generatePresignedUrl(image.key);
          return {
            ...image,
            url
          }
        })
      )
    }

    throw new NotFoundException('User with this id does not exist');
  }

  async findAllByDiscId(discId: number) {
    const entities: Product[] = await this.productsRepository.findAllByDiscId(discId);

    return entities.map(e => this.toDto(e));
  }

  async findById(productId: number) {
    const entity: Product = await this.productsRepository.findById(productId);

    return this.toDto(entity);
  }

  async deleteBulk(data: number[], queryRunner?: QueryRunner): Promise<any> {
    return await this.productsRepository.deleteProductsBulk(
      data,
      queryRunner
    );
  }

  toEntity(dto: ProductDto): Product {
    return {
      product_id: dto.productId,
      disc_id: dto.discId,
      condition: dto.condition,
      price: dto.price
    }
  }

  toDto(entity: Product): ProductDto {
    return {
      productId: entity.product_id,
      discId: entity.disc_id,
      condition: entity.condition,
      price: entity.price,
    }
  }
}
