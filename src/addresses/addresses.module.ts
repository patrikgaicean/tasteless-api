import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from './addresses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressesRepository])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: []
})
export class AddressesModule {}
