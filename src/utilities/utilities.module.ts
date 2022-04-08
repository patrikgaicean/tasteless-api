import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { DiscsModule } from '../discs/discs.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DiscsModule,
    ConfigModule
  ],
  controllers: [UtilitiesController],
  providers: [UtilitiesService]
})
export class UtilitiesModule {}
