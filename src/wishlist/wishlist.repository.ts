import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, QueryRunner, Repository} from "typeorm";
import { Wishlist } from "./entities/wishlist.entity";

@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist> {

  async createWishlistItem(data: Wishlist, queryRunner?: QueryRunner): Promise<Wishlist> {
    const entity: Wishlist = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAllForUser(user_id: number): Promise<Wishlist[]> {
    return await this.createQueryBuilder('wishlist')
      .leftJoinAndSelect(`wishlist.disc`, `disc`)
      .where(`user_id = :id`, { id: user_id })
      .getMany();
  }

  async removeForUser(wishlist_id: number, user_id: number) {
    return await this.delete({ wishlist_id, user_id });
  }
}
