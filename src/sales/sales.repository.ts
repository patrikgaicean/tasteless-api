import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, QueryRunner, Repository} from "typeorm";
import { Sale } from "./entities/sale.entity";

@EntityRepository(Sale)
export class SalesRepository extends Repository<Sale> {

  async createSale(data: Sale): Promise<Sale> {
    const entity: Sale = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async createSalesBulk(data: Sale[], queryRunner?: QueryRunner): Promise<Sale[]> {
    const entities: Sale[] = this.create(data);

    try {
      if (queryRunner) {
        await queryRunner.manager.save(entities);
      } else {
        await this.save(entities);
      }
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entities;
  }

  async findProductsByOrderId(order_id: number): Promise<Sale[]> {
    return await this.createQueryBuilder('orders')
      .leftJoinAndSelect(`orders.product`, `product`)
      .leftJoinAndSelect(`product.disc`, `disc`)
      .where(`order_id = :id`, { id: order_id })
      .getMany();
  }

}
