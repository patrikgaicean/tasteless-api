import {EntityRepository, Repository} from "typeorm";
import { ProductImage } from "./entities/product-image.entity";

@EntityRepository(ProductImage)
export class ProductImagesRepository extends Repository<ProductImage> {

  async createImage(imageData: ProductImage): Promise<ProductImage> {
    const entity: ProductImage = this.create(imageData);

    await this.save(entity);

    return entity;
  }
  
}
