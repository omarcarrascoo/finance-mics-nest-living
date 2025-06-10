import { Module } from '@nestjs/common';
import { BankReconciliationService } from './bank-reconciliation.service';
import { BankReconciliationController } from './bank-reconciliation.controller';

@Module({
  controllers: [BankReconciliationController],
  providers: [BankReconciliationService],
})
export class BankReconciliationModule {}
