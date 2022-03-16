import { Module } from '@nestjs/common';
import { DiscsService } from './discs.service';
import { DiscsController } from './discs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscsRepository } from './discs.repository';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscsRepository]),
    FilesModule
  ],
  controllers: [DiscsController],
  providers: [DiscsService]
})
export class DiscsModule {}
