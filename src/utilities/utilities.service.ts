import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DiscsService } from '../discs/discs.service';
import { RankingsService } from '../rankings/rankings.service';

@Injectable()
export class UtilitiesService {

  constructor(
    private authService: AuthService,
    private discsService: DiscsService,
    private rankingsService: RankingsService
  ) {}

  async createAdminUser() {
    return await this.authService.createAdminUser();
  }

  async createDiscsAndProducts(no: number) {
    return await this.discsService.mockDiscs(no);
  }

  async createRankings(userId: number) {
    return await this.rankingsService.mockRankings(userId);
  }

  async getCatalog() {
    return await this.discsService.getCatalog();
  }
}
