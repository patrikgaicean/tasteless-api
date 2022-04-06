import { Controller, Post, Param } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('utilities')
@ApiTags('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post('/create-admin-user')
  async createAdminUser() {
    return this.utilitiesService.createAdminUser();
  }

  @Post('/create-discs-and-products')
  async mockDiscs(@Param('no') no: string) {
    return await this.utilitiesService.createDiscsAndProducts(+no);
  }
}
