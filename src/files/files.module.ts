import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscImagesRepository } from './disc-images.repository';
import { ProductImagesRepository } from './product-images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscImagesRepository, ProductImagesRepository])],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
