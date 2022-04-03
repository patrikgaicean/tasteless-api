import { HttpException, HttpStatus } from "@nestjs/common";
import {Brackets, EntityRepository, Repository} from "typeorm";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { Disc } from "./entities/disc.entity";

@EntityRepository(Disc)
export class DiscsRepository extends Repository<Disc> {

  async createDisc(data: Disc): Promise<Disc> {
    const existing: Disc = await this.findOne({
      title: data.title,
      artist: data.artist,
      release_date: data.release_date,
      track_list: data.track_list
    })

    if (existing) {
      throw new HttpException(`Disc with supplied info already exists`, 409);
    }

    const entity: Disc = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAll(user_id?: number): Promise<Disc[]> {
    return await this.find({ relations: ['images'] })
  }

  async findById(disc_id: number): Promise<Disc> {
    const entity: Disc = await this.findOne({ disc_id })

    if (!entity) {
      throw new HttpException(`Disc with id ${disc_id} not found`, 404);
    }

    return entity;
  }

  async findDiscWithImages(disc_id: number): Promise<Disc> {
    return await this.findOne(
      { disc_id },
      { relations: ['images'] }
    );
  }
}
