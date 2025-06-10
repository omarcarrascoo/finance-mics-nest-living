import { Module } from '@nestjs/common';
import { ReserveFundTransactionsService } from './reserve-fund-transactions.service';
import { ReserveFundTransactionsController } from './reserve-fund-transactions.controller';

@Module({
  controllers: [ReserveFundTransactionsController],
  providers: [ReserveFundTransactionsService],
})
export class ReserveFundTransactionsModule {}
