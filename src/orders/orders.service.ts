import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductDto } from '../products/dto/product.dto';
import { ProductsService } from '../products/products.service';
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
    private productsService: ProductsService,
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

      await this.productsService.deleteBulk(productIds, queryRunner);
  
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

    return Promise.all(entities.map(async(e) => {
      const products: ProductDto[] = await this.salesService.findProductsByOrderId(e.order_id);

      return {
        ...this.toDto(e),
        products
      }
    }))
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
      address_id: dto.addressId,
      order_date: new Date(dto.orderDate),
      shipping_type: dto.shippingType,
      payment_method: dto.paymentMethod,
      paid: dto.paid,
      shipped: dto.shipped,
      delivered: dto.delivered
    }
  }

  toDto(entity: Order): OrderDto {
    return {
      orderId: entity.order_id,
      userId: entity.user_id,
      addressId: entity.address_id,
      orderDate: `${entity.order_date}`,
      shippingType: entity.shipping_type,
      paymentMethod: entity.payment_method,
      paid: entity.paid,
      shipped: entity.shipped,
      delivered: entity.delivered
    }
  }

}
