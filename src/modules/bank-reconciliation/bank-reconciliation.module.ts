import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankReconciliationService } from './bank-reconciliation.service';
import { BankReconciliationController } from './bank-reconciliation.controller';
import { BankTransaction } from './entities/bank-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankTransaction])],
  controllers: [BankReconciliationController],
  providers: [BankReconciliationService],
})
export class BankReconciliationModule {}
