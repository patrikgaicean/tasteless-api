import { Module } from '@nestjs/common';
import { DiscsService } from './discs.service';
import { DiscsController } from './discs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscsRepository } from './discs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscsRepository])],
  controllers: [DiscsController],
  providers: [DiscsService]
})
export class DiscsModule {}
