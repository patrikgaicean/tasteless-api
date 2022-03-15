import { HttpException } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Image } from "./entities/image.entity";

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {

  async createImage(imageData: Image): Promise<Image> {
    const entity: Image = this.create(imageData);

    await this.save(entity);

    return entity;
  }
  
}
