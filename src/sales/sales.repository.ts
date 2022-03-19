import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
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

  async createSalesBulk(data: Sale[]): Promise<Sale[]> {
    const entities: Sale[] = this.create(data);

    try {
      await this.save(entities);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entities;
  }

  async findProductsByOrderId(order_id: number): Promise<Sale[]> {
    return await this.find({
      where: {
        order_id
      },
      relations: ['product']
    });
  }

}
