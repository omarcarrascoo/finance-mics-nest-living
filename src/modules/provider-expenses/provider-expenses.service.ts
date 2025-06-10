import { Injectable } from '@nestjs/common';
import { ProviderExpense } from './entities/provider-expense.entity';

@Injectable()
export class ProviderExpensesService {
  create(expense: ProviderExpense) {
    return `This action adds a new provider expense`;
  }

  findAll() {
    return `This action returns all provider expenses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} provider expense`;
  }

  update(id: string, expense: ProviderExpense) {
    return `This action updates a #${id} provider expense`;
  }

  remove(id: string) {
    return `This action removes a #${id} provider expense`;
  }
}
