import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankTransaction } from './entities/bank-transaction.entity';

@Injectable()
export class BankReconciliationService {
  constructor(
    @InjectRepository(BankTransaction)
    private readonly bankRepo: Repository<BankTransaction>,
  ) {}

  create(tx: BankTransaction) {
    return this.bankRepo.save(tx);
  }

  findAll() {
    return this.bankRepo.find();
  }

  findOne(id: string) {
    return this.bankRepo.findOne({ where: { id } });
  }

  update(id: string, tx: Partial<BankTransaction>) {
    return this.bankRepo.update(id, tx);
  }

  remove(id: string) {
    return this.bankRepo.delete(id);
  }
}
