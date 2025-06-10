import { Module } from '@nestjs/common';
import { ReserveFundTransactionsService } from './reserve-fund-transactions.service';

@Module({
  providers: [ReserveFundTransactionsService],
})
export class ReserveFundTransactionsModule {}
