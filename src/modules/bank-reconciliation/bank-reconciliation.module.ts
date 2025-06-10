import { Module } from '@nestjs/common';
import { BankReconciliationService } from './bank-reconciliation.service';

@Module({
  providers: [BankReconciliationService],
})
export class BankReconciliationModule {}
