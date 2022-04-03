import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Product } from "./entities/product.entity";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  async createProduct(data: Product): Promise<Product> {
    const entity: Product = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAllByDiscId(disc_id: number): Promise<Product[]> {
    return await this.find({ disc_id });
  }

  async findById(product_id: number): Promise<Product> {
    const entity: Product = await this.findOne({ product_id })

    if (!entity) {
      throw new HttpException(`Product with id ${product_id} not found`, 404);
    }

    return entity;
  }

  async findLowestPrice(disc_id: number): Promise<number> {
    const { lowestPrice } = await this.createQueryBuilder('products')
      .select('MIN(products.price)', 'lowestPrice')
      .where('products.disc_id = :id', { id: disc_id })
      .getRawOne();

    return lowestPrice;
  }

}
