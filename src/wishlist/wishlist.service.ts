import { Injectable } from '@nestjs/common';
import { DiscsService } from '../discs/discs.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    private wishlistRepository: WishlistRepository,
    private discsService: DiscsService
  ) {}

  async create(createWishlistDto: CreateWishlistDto, userId: number) {
    const entity: Wishlist = await this.wishlistRepository.createWishlistItem(
      this.toEntity({ userId, ...createWishlistDto })
    );

    return this.toDto(entity);
  }

  async findAllForUser(userId: number) {
    const entities: Wishlist[] = await this.wishlistRepository.findAllForUser(userId);

    return Promise.all(
      entities.map(async (e) => {
        const dto = this.toDto(e);

        return {
          ...dto,
          ...await this.discsService.findOne(e.disc_id, false)
        }
      })
    )
  }

  async removeForUser(id: number, userId: number) {
    return await this.wishlistRepository.removeForUser(id, userId);
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
