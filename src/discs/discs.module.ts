import { Module } from '@nestjs/common';
import { DiscsService } from './discs.service';
import { DiscsController } from './discs.controller';

@Module({
  controllers: [DiscsController],
  providers: [DiscsService]
})
export class DiscsModule {}
