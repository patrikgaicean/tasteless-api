import { HttpException } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Disc } from "./entities/disc.entity";

@EntityRepository(Disc)
export class DiscsRepository extends Repository<Disc> {

  async createDisc(discData: Disc): Promise<Disc> {
    const existing: Disc = await this.findOne({
      title: discData.title,
      artist: discData.artist,
      release_date: discData.release_date,
      track_list: discData.track_list
    })

    if (existing) {
      throw new HttpException(`Disc with supplied info already exists`, 409);
    }

    const entity: Disc = this.create(discData);

    await this.save(entity);

    return entity;
  }

  async addImages(discId: number, imagesIds: number[]) {
    return await this.update(discId, { images: imagesIds });
  }

  async findAll(): Promise<Disc[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Disc> {
    const entity: Disc = await this.findOne({ disc_id: id })

    if (!entity) {
      throw new HttpException(`Disc with id ${id} not found`, 404);
    }

    return entity;
  }
}
