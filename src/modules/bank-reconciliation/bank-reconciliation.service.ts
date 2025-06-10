import { Injectable } from '@nestjs/common';
import { BankTransaction } from './entities/bank-transaction.entity';

@Injectable()
export class BankReconciliationService {
  create(tx: BankTransaction) {
    return `This action adds a new bank transaction`;
  }

  findAll() {
    return `This action returns all bank transactions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} bank transaction`;
  }

  update(id: string, tx: BankTransaction) {
    return `This action updates a #${id} bank transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} bank transaction`;
  }
}
