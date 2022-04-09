import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';

@Controller('rankings')
@ApiTags('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUserDto, @Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllForUser(@Req() req: RequestWithUserDto) {
    return this.rankingsService.findAllForUser(req.user.userId);
  }

  @Get(':discId')
  @UseGuards(JwtAuthGuard)
  findOneForUser(@Req() req: RequestWithUserDto, @Param('discId') discId: string) {
    return this.rankingsService.findOneForUser(req.user.userId, +discId);
  }

}
