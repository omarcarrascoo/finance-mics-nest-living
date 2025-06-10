import { Module } from '@nestjs/common';
import { DelinquenciesService } from './delinquencies.service';
import { DelinquenciesController } from './delinquencies.controller';

@Module({
  controllers: [DelinquenciesController],
  providers: [DelinquenciesService],
})
export class DelinquenciesModule {}
