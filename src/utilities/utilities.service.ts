import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DiscsService } from '../discs/discs.service';

@Injectable()
export class UtilitiesService {

  constructor(
    private authService: AuthService,
    private discsService: DiscsService,
  ) {}

  async createAdminUser() {
    return await this.authService.createAdminUser();
  }

  async createDiscsAndProducts(no: number) {
    return await this.discsService.mockDiscs(no);
  }

  async getCatalog() {
    return await this.discsService.getCatalog();
  }
}
