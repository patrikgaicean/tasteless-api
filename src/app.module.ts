import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DiscsModule } from './discs/discs.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [UsersModule, OrdersModule, DiscsModule, ProductsModule, SalesModule, WishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
