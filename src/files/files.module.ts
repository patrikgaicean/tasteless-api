import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesRepository } from './images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository])],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
