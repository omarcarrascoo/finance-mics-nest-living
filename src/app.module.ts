import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './modules/payments/payments.module';
import { DelinquenciesModule } from './modules/delinquencies/delinquencies.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProviderExpensesModule } from './modules/provider-expenses/provider-expenses.module';
import { ResidentsModule } from './modules/residents/residents.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { ExtraordinaryExpensesModule } from './modules/extraordinary-expenses/extraordinary-expenses.module';
import { ReserveFundTransactionsModule } from './modules/reserve-fund-transactions/reserve-fund-transactions.module';
import { BankReconciliationModule } from './modules/bank-reconciliation/bank-reconciliation.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PaymentsModule,
    DelinquenciesModule,
    CategoriesModule,
    ProviderExpensesModule,
    ResidentsModule,
    BudgetsModule,
    ExtraordinaryExpensesModule,
    ReserveFundTransactionsModule,
    BankReconciliationModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
