import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, QueryRunner, Repository} from "typeorm";
import { Order } from "./entities/order.entity";

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

  async createOrder(data: Order, queryRunner?: QueryRunner): Promise<Order> {
    const entity: Order = this.create(data);

    try {
      if (queryRunner) {
        await queryRunner.manager.save(entity);
      } else {
        await this.save(entity);
      }
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAllForUser(user_id: number): Promise<Order[]> {
    return await this.find({ user_id });
  }

  async findByUserAndId(order_id: number, user_id: number): Promise<Order> {
    const entity: Order = await this.findOne({ order_id, user_id })

    if (!entity) {
      throw new HttpException(`Order with id ${order_id} and user_id ${user_id} not found`, 404);
    }

    return entity;
  }

}
