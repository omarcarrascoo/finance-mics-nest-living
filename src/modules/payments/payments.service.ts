import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  create(payment: Payment) {
    return `This action adds a new payment`;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: string) {
    return `This action returns a #${id} payment`;
  }

  update(id: string, payment: Payment) {
    return `This action updates a #${id} payment`;
  }

  remove(id: string) {
    return `This action removes a #${id} payment`;
  }
}
