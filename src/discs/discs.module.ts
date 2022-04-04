import { Module } from '@nestjs/common';
import { DiscsService } from './discs.service';
import { DiscsController } from './discs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscsRepository } from './discs.repository';
import { FilesModule } from '../files/files.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscsRepository]),
    FilesModule,
    ProductsModule
  ],
  controllers: [DiscsController],
  providers: [DiscsService],
  exports: [DiscsService]
})
export class DiscsModule {}
