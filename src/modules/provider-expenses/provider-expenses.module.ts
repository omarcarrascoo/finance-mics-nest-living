import { Module } from '@nestjs/common';
import { ProviderExpensesService } from './provider-expenses.service';

@Module({
  providers: [ProviderExpensesService],
})
export class ProviderExpensesModule {}
