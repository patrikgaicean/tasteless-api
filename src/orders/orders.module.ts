import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { SalesModule } from '../sales/sales.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    SalesModule,
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
