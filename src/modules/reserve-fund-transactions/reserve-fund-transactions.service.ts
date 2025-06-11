import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReserveFundTransaction } from './entities/reserve-fund-transaction.entity';

@Injectable()
export class ReserveFundTransactionsService {
  constructor(
    @InjectRepository(ReserveFundTransaction)
    private readonly reserveRepo: Repository<ReserveFundTransaction>,
  ) {}

  create(tx: ReserveFundTransaction) {
    return this.reserveRepo.save(tx);
  }

  findAll() {
    return this.reserveRepo.find();
  }

  findOne(id: string) {
    return this.reserveRepo.findOne({ where: { id } });
  }

  update(id: string, tx: Partial<ReserveFundTransaction>) {
    return this.reserveRepo.update(id, tx);
  }

  remove(id: string) {
    return this.reserveRepo.delete(id);
  }
}
