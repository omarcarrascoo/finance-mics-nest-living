import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condo } from './entities/condo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condo])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CondosModule {}
