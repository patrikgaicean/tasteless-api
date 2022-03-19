import { Injectable } from '@nestjs/common';
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
    private salesService: SalesService
  ) {}

  async create(data: CreateOrderDto) {
    const { productIds , ...order } = data;

    const entity: Order = await this.ordersRepository.createOrder(this.toEntity(order));

    await this.salesService.createBulk(
      productIds.map(p => ({ productId: p, orderId: entity.order_id }))
    );

    return this.toDto(entity);
  }

  async findAll() {
    const entities: Order[] = await this.ordersRepository.findAll();

    return entities.map(e => this.toDto(e));
  }

  async findOne(id: number) {
    const entity: Order = await this.ordersRepository.findById(id);

    return this.toDto(entity);
  }

  async findOneDetails(id: number) {
    const entity: Order = await this.ordersRepository.findById(id);

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
