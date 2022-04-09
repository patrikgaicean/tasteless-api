import { forwardRef, Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsRepository } from './rankings.repository';
import { DiscsModule } from '../discs/discs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RankingsRepository]),
    forwardRef(() => DiscsModule)
  ],
  controllers: [RankingsController],
  providers: [RankingsService],
  exports: [RankingsService, TypeOrmModule]
})
export class RankingsModule {}
