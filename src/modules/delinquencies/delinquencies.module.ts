import { Module } from '@nestjs/common';
import { DelinquenciesService } from './delinquencies.service';

@Module({
  providers: [DelinquenciesService],
})
export class DelinquenciesModule {}
