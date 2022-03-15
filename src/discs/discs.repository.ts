import { HttpException } from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import { Disc } from "./entities/disc.entity";

@EntityRepository(Disc)
export class DiscsRepository extends Repository<Disc> {

  async createDisc(discData: Disc): Promise<Disc> {
    const entity: Disc = this.create(discData);

    await this.save(entity);

    return entity;
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
