import { Injectable } from '@nestjs/common';
import { ReserveFundTransaction } from './entities/reserve-fund-transaction.entity';

@Injectable()
export class ReserveFundTransactionsService {
  create(tx: ReserveFundTransaction) {
    return `This action adds a new reserve fund transaction`;
  }

  findAll() {
    return `This action returns all reserve fund transactions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} reserve fund transaction`;
  }

  update(id: string, tx: ReserveFundTransaction) {
    return `This action updates a #${id} reserve fund transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} reserve fund transaction`;
  }
}
