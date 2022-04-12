import { Controller, Post, Param, Get, Res, UseGuards, Req } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';

@Controller('utilities')
@ApiTags('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post('/create-admin-user')
  async createAdminUser() {
    return this.utilitiesService.createAdminUser();
  }

  @Post('/discs-n-products/:no')
  // TODO add guard for admin
  async mockDiscs(@Param('no') no: string) {
    return await this.utilitiesService.createDiscsAndProducts(+no);
  }

  @Post('/dummy-rankings')
  @UseGuards(JwtAuthGuard) // TODO add guard for admin
  async mockRankings(@Req() req: RequestWithUserDto) {
    return await this.utilitiesService.createRankings(req.user.userId);
  }

  @Get('/catalog')
  async getCatalog(@Res() res: Response) {
    const file = await this.utilitiesService.getCatalog();

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="tasteless-records-catalog.xls"',
    });

    file.write(`tasteless-records-catalog.xlsx`, res)
  }
}
