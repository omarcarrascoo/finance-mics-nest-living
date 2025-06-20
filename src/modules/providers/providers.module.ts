// src/modules/providers/providers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { ProviderContact } from './entities/provider-contact.entity';
import { ProviderContract } from './entities/provider-contract.entity';
import { ProviderDocument } from './entities/provider-document.entity';
import { ProviderStatistic } from './entities/provider-statistic.entity';
import { ProviderExpense } from './entities/provider-expense.entity';
import { ProviderExpensesController } from './provider-expenses/provider-expenses.controller';
import { ProviderExpensesService } from './provider-expenses/provider-expenses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      ProviderContact,
      ProviderContract,
      ProviderDocument,
      ProviderStatistic,
      ProviderExpense,
    ]),
  ],
  controllers: [ProvidersController, ProviderExpensesController],
  providers: [ProvidersService, ProviderExpensesService],
})
export class ProvidersModule {}
