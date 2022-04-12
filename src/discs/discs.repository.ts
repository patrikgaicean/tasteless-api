import { HttpException, HttpStatus } from "@nestjs/common";
import { Brackets, EntityRepository, Repository } from "typeorm";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { DiscQuery } from "./dto/query";
import { Disc } from "./entities/disc.entity";

@EntityRepository(Disc)
export class DiscsRepository extends Repository<Disc> {

  async createDisc(data: Disc): Promise<Disc> {
    const existing: Disc = await this.findOne({
      title: data.title,
      artist: data.artist
    })

    if (existing) {
      throw new HttpException(`Disc with supplied info already exists`, 409);
    }

    const entity: Disc = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('Already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAll(query: DiscQuery): Promise<Disc[]> {
    let queried = false; // only accept one query at a time

    const q = this.createQueryBuilder('disc')
      .leftJoinAndSelect('disc.images', 'images')
      .where(new Brackets(qb => {
        if (query.selectedGenre) {
          qb.andWhere('disc.genre = :genre', { genre: query.selectedGenre })
          queried = true;
        } else if (query.artist && !queried) {
          qb.andWhere('LOWER(disc.artist) LIKE :artist', { artist: `%${query.artist}%` })
          queried = true;
        }
      }))

    if (query.newInStock === true && !queried) {
      q.leftJoinAndSelect('disc.products', 'product')
        .where('product.deleted = false')
        .orderBy('product.added', 'DESC')
        .limit(20)
      queried = true;
    }

    else if (query.top100 === true && !queried) {
      q.leftJoinAndSelect('disc.rankings', 'ranking')
        .orderBy('ranking.rank', 'DESC')
        .limit(100)
      queried = true;
    }

    else if (query.sale === true && !queried) {
      q.leftJoinAndSelect('disc.products', 'product')
        .where('product.deleted = false')
        .orderBy('product.price', 'ASC')
        .limit(20)
      queried = true;
    }

    return await q.getMany();
  }

  async findAllWithProduct(): Promise<Disc[]> {
    return this.createQueryBuilder('disc')
      .leftJoinAndSelect('disc.products', 'product')
      .where('product.deleted = false')
      .select([
        'disc.disc_id',
        'disc.title',
        'disc.artist',
        'disc.release_date',
        'disc.genre',
        'product.product_id',
        'product.condition',
        'product.price'
      ])
      .getMany();
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

  async getGenres() {
    return await this.manager.query(`
      SELECT DISTINCT genre
      FROM discs;
    `)
  }
}
