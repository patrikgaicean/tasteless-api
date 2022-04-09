import { Injectable } from '@nestjs/common';
import { DiscsService } from '../discs/discs.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingDto } from './dto/ranking.dto';
import { Ranking } from './entities/ranking.entity';
import { RankingsRepository } from './rankings.repository';

@Injectable()
export class RankingsService {
  constructor(
    private rankingsRepository: RankingsRepository,
    private discsService: DiscsService
  ) {}

  async create(createRankingDto: CreateRankingDto, userId: number) {
    const entity: Ranking = await this.rankingsRepository.createRanking(
      this.toEntity({ userId, ...createRankingDto })
    );

    return this.toDto(entity);
  }

  async findAllForUser(userId: number) {
    const entities: Ranking[] = await this.rankingsRepository.findAllForUser(userId);

    return entities.map(e => this.toDto(e));
  }

  async findOneForUser(userId: number, discId: number) {
    return await this.rankingsRepository.findOneForUser(userId, discId);
  }

  async mockRankings(userId: number) {
    const discs = await this.discsService.findAll({} as any);

    await Promise.all(discs.map(async (disc) => {
      return this.create({ discId: disc.discId, rank: this.getRandomFloat(0, 5) }, userId)
    }))

    return { message: `Created initial rankings.`}
  }

  toEntity(dto: RankingDto): Ranking {
    return {
      ranking_id: dto.rankingId,
      user_id: dto.userId,
      disc_id: dto.discId,
      rank: dto.rank
    }
  }

  toDto(entity: Ranking): RankingDto {
    return {
      rankingId: entity.ranking_id,
      userId: entity.user_id,
      discId: entity.disc_id,
      rank: entity.rank
    }
  }

  private getRandomFloat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number((Math.random() * (max - min) + min).toFixed(2)); //The maximum is exclusive and the minimum is inclusive
  }

}
