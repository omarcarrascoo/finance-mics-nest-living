import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderExpensesService } from './provider-expenses.service';
import { ProviderExpensesController } from './provider-expenses.controller';
import { ProviderExpense } from './entities/provider-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderExpense])],
  controllers: [ProviderExpensesController],
  providers: [ProviderExpensesService],
})
export class ProviderExpensesModule {}
