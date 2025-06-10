import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepo: Repository<Payment>,
  ) {}

  create(payment: Payment) {
    return this.paymentsRepo.save(payment);
  }

  findAll() {
    return this.paymentsRepo.find({ relations: ['resident', 'category'] });
  }

  findOne(id: string) {
    return this.paymentsRepo.findOne({ where: { id }, relations: ['resident', 'category'] });
  }

  update(id: string, payment: Partial<Payment>) {
    return this.paymentsRepo.update(id, payment);
  }

  remove(id: string) {
    return this.paymentsRepo.delete(id);
  }
}
