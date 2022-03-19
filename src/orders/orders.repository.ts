import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Order } from "./entities/order.entity";

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

  async createOrder(data: Order): Promise<Order> {
    const entity: Order = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAll(): Promise<Order[]> {
    return await this.find();
  }

  async findById(order_id: number): Promise<Order> {
    const entity: Order = await this.findOne({ order_id })

    if (!entity) {
      throw new HttpException(`Order with id ${order_id} not found`, 404);
    }

    return entity;
  }

}
