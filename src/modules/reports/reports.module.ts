import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Payment } from '../payments/entities/payment.entity';
import { ExtraordinaryExpense } from '../extraordinary-expenses/entities/extraordinary-expense.entity';
import { ReserveFundTransaction } from '../reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../bank-reconciliation/entities/bank-transaction.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { BudgetItem } from '../budgets/entities/budget-item.entity';
import { Delinquency } from '../delinquencies/entities/delinquency.entity';
import { Resident } from '../residents/entities/resident.entity';
import { Maintenance } from '../maintenance/entities/maintenance.entity';
import { ProviderExpense } from '../providers/entities/provider-expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      ProviderExpense,
      ExtraordinaryExpense,
      ReserveFundTransaction,
      BankTransaction,
      Budget,
      BudgetItem,
      Delinquency,
      Resident,
      Maintenance,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
