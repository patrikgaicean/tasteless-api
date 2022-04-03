import {EntityRepository, Repository} from "typeorm";
import { DiscImage } from "./entities/disc-image.entity";

@EntityRepository(DiscImage)
export class DiscImagesRepository extends Repository<DiscImage> {

  async findOneByDiscId(disc_id: number): Promise<boolean> {
    const entity: DiscImage[] = await this.find({ disc_id });

    return !!entity.length;
  }

  async createImage(data: DiscImage): Promise<DiscImage> {
    const entity: DiscImage = this.create(data);

    await this.save(entity);

    return entity;
  }
  
}
