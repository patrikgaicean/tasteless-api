import {EntityRepository, Repository} from "typeorm";
import { ProductImage } from "./entities/product-image.entity";

@EntityRepository(ProductImage)
export class ProductImagesRepository extends Repository<ProductImage> {

  async findOneByDiscId(product_id: number): Promise<boolean> {
    const entity: ProductImage[] = await this.find({ product_id });

    return !!entity.length;
  }


  async createImage(imageData: ProductImage): Promise<ProductImage> {
    const entity: ProductImage = this.create(imageData);

    await this.save(entity);

    return entity;
  }
  
}
