import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistRepository])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: []
})
export class WishlistModule {}
