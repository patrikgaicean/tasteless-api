import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    private wishlistRepository: WishlistRepository,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, userId: number) {
    const entity: Wishlist = await this.wishlistRepository.createWishlistItem(
      this.toEntity({ userId, ...createWishlistDto })
    );

    return this.toDto(entity);
  }

  async findAllForUser(userId: number) {
    const entities: Wishlist[] = await this.wishlistRepository.findAllForUser(userId);

    return entities.map(e => this.toDto(e));
  }

  async findOneDetailsForUser(id: number, userId: number) {
    const entity: Wishlist = await this.wishlistRepository.findDiscByWishlistAndUserId(id, userId);

    // si de fapt trebuie sa returneze doar title, artist si link la imaginea discului

    return {
      ...this.toDto(entity),
      ...entity.disc // toDto
    }
  }

  async removeForUser(id: number, userId: number) {

  }

  toEntity(dto: WishlistDto): Wishlist {
    return {
      wishlist_id: dto.wishlistId,
      user_id: dto.userId,
      disc_id: dto.discId
    }
  }

  toDto(entity: Wishlist): WishlistDto {
    return {
      wishlistId: entity.wishlist_id,
      userId: entity.user_id,
      discId: entity.disc_id
    }
  }

}
