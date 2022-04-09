import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, In, QueryRunner, Repository} from "typeorm";
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
    return await this.find({ disc_id, deleted: false });
  }

  async findById(product_id: number): Promise<Product> {
    const entity: Product = await this.findOne({ product_id, deleted: false })

    if (!entity) {
      throw new HttpException(`Product with id ${product_id} not found`, 404);
    }

    return entity;
  }

  async findLowestPrice(disc_id: number): Promise<any> {
    const resp = await this.createQueryBuilder('products')
      .select('MIN(products.price)', 'lowestPrice')
      .addSelect('product_id', 'product_id')
      .where('products.disc_id = :id', { id: disc_id })
      .groupBy('product_id')
      .orderBy('MIN(products.price)', 'ASC')
      .getRawOne();

    if (!resp) {
      return {
        lowestPrice: null,
        productId: null
      }
    }

    return {
      lowestPrice: resp.lowestPrice,
      productId: resp.product_id
    }
  }

  async deleteProductsBulk(data: number[], queryRunner?: QueryRunner): Promise<any> {
    try {
      if (queryRunner) {
        await queryRunner.manager
          .createQueryBuilder()
          .update(Product)
          .set({ deleted: true })
          .where({ product_id: In(data) })
          .execute();
      } else {
        await this.createQueryBuilder()
          .update(Product)
          .set({ deleted: true })
          .where({ product_id: In(data) })
          .execute();
      }
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
