import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DiscsService } from '../discs/discs.service';
import { UpdateUtilityDto } from './dto/update-utility.dto';

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

  findAll() {
    return `This action returns all utilities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utility`;
  }

  update(id: number, updateUtilityDto: UpdateUtilityDto) {
    return `This action updates a #${id} utility`;
  }

  remove(id: number) {
    return `This action removes a #${id} utility`;
  }
}
