import { Module } from '@nestjs/common';
import { ProviderExpensesService } from './provider-expenses.service';
import { ProviderExpensesController } from './provider-expenses.controller';

@Module({
  controllers: [ProviderExpensesController],
  providers: [ProviderExpensesService],
})
export class ProviderExpensesModule {}
