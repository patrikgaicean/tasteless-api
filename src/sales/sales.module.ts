import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { SalesRepository } from './sales.repository';
import { SalesService } from './sales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesRepository]),
    ProductsModule
  ],
  controllers: [],
  providers: [SalesService],
  exports: [SalesService]
})
export class SalesModule {}
