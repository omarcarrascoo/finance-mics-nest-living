import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveFundTransactionsService } from './reserve-fund-transactions.service';
import { ReserveFundTransactionsController } from './reserve-fund-transactions.controller';
import { ReserveFundTransaction } from './entities/reserve-fund-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveFundTransaction])],
  controllers: [ReserveFundTransactionsController],
  providers: [ReserveFundTransactionsService],
})
export class ReserveFundTransactionsModule {}
