import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelinquenciesService } from './delinquencies.service';
import { DelinquenciesController } from './delinquencies.controller';
import { Delinquency } from './entities/delinquency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delinquency])],
  controllers: [DelinquenciesController],
  providers: [DelinquenciesService],
})
export class DelinquenciesModule {}
