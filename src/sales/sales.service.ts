import { Injectable } from '@nestjs/common';
import { ProductDto } from '../products/dto/product.dto';
import { ProductsService } from '../products/products.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(
    private salesRepository: SalesRepository,
    private productsService: ProductsService
  ) {}

  async create(data: CreateSaleDto): Promise<SaleDto> {
    const entity: Sale = await this.salesRepository.createSale(this.toEntity(data));

    return this.toDto(entity);
  }

  async createBulk(data: CreateSaleDto[]): Promise<SaleDto[]> {
    const entities: Sale[] = await this.salesRepository.createSalesBulk(
      data.map(d => this.toEntity(d))
    );

    return entities.map(e => this.toDto(e));
  }

  async findProductsByOrderId(orderId: number): Promise<ProductDto[]> {
    const entities: Sale[] = await this.salesRepository.findProductsByOrderId(orderId)

    return entities.map(e => {
      const { product, ...sale } = e;

      return {
        ...this.productsService.toDto(product)
      }
    });
  }

  toEntity(dto: SaleDto): Sale {
    return {
      sale_id: dto.saleId,
      order_id: dto.orderId,
      product_id: dto.productId
    }
  }

  toDto(entity: Sale): SaleDto {
    return {
      saleId: entity.sale_id,
      orderId: entity.order_id,
      productId: entity.product_id
    }
  }

}
