import { Module } from '@nestjs/common';
import { ResidentsService } from './residents.service';

@Module({
  providers: [ResidentsService],
})
export class ResidentsModule {}
