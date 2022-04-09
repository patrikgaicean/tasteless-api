import { HttpException, HttpStatus } from "@nestjs/common";
import {EntityRepository, QueryRunner, Repository} from "typeorm";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { Ranking } from "./entities/ranking.entity";

@EntityRepository(Ranking)
export class RankingsRepository extends Repository<Ranking> {

  async createRanking(data: Ranking, queryRunner?: QueryRunner): Promise<Ranking> {
    const entity: Ranking = this.create(data);

    try {
      await this.save(entity);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        // throw new HttpException('Already exists', HttpStatus.BAD_REQUEST);
        return
      }

      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return entity;
  }

  async findAllForUser(user_id: number): Promise<Ranking[]> {
    return await this.createQueryBuilder('rankings')
      .leftJoinAndSelect(`rankings.disc`, `disc`)
      .where(`user_id = :id`, { id: user_id })
      .getMany();
  }

  async findDiscAverageRanking(disc_id: number): Promise<any> {
    const { averageRank } = await this.createQueryBuilder('rankings')
      .select('AVG(rankings.rank)', 'averageRank')
      .where('rankings.disc_id = :id', { id: disc_id })
      .getRawOne();

    return Number(averageRank);
  }

}
