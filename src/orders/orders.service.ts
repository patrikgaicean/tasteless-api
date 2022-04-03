import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductDto } from '../products/dto/product.dto';
import { SalesService } from '../sales/sales.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private salesService: SalesService,
    private connection: Connection
  ) {}

  async create(data: CreateOrderDto, userId: number) {
    const { productIds , ...order } = data;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const entity: Order = await this.ordersRepository.createOrder(
        this.toEntity({ userId, ...order }),
        queryRunner
      );

      await this.salesService.createBulk(
        productIds.map(p => ({ productId: p, orderId: entity.order_id })),
        queryRunner
      );
  
      await queryRunner.commitTransaction();

      return this.toDto(entity);
    } catch(error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAllForUser(userId: number) {
    const entities: Order[] = await this.ordersRepository.findAllForUser(userId);

    return entities.map(e => this.toDto(e));
  }

  async findOneDetailsForUser(id: number, userId: number) {
    const entity: Order = await this.ordersRepository.findByUserAndId(id, userId);

    const products: ProductDto[] = await this.salesService.findProductsByOrderId(entity.order_id);

    return {
      ...this.toDto(entity),
      products
    }
  }

  toEntity(dto: OrderDto): Order {
    return {
      order_id: dto.orderId,
      user_id: dto.userId,
      order_date: new Date(dto.orderDate),
      shipped: dto.shipped,
      delivered: dto.delivered
    }
  }

  toDto(entity: Order): OrderDto {
    return {
      orderId: entity.order_id,
      userId: entity.user_id,
      orderDate: `${entity.order_date}`,
      shipped: entity.shipped,
      delivered: entity.delivered
    }
  }

}
