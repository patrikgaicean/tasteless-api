import {EntityRepository, Repository} from "typeorm";
import { DiscImage } from "./entities/disc-image.entity";

@EntityRepository(DiscImage)
export class DiscImagesRepository extends Repository<DiscImage> {

  async createImage(imageData: DiscImage): Promise<DiscImage> {
    const entity: DiscImage = this.create(imageData);

    await this.save(entity);

    return entity;
  }
  
}
