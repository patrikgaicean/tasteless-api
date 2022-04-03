import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { DiscsModule } from '../discs/discs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WishlistRepository]),
    DiscsModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: []
})
export class WishlistModule {}
