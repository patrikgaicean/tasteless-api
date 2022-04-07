import { Controller, Post, Param, Get, Res } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get('/catalog')
  async getCatalog(@Res() res: Response) {
    const file = await this.utilitiesService.getCatalog();

    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });

    // file.pipe(res);
  }
}
