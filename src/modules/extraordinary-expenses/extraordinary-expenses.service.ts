import { Injectable } from '@nestjs/common';
import { ExtraordinaryExpense } from './entities/extraordinary-expense.entity';

@Injectable()
export class ExtraordinaryExpensesService {
  create(expense: ExtraordinaryExpense) {
    return `This action adds a new extraordinary expense`;
  }

  findAll() {
    return `This action returns all extraordinary expenses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} extraordinary expense`;
  }

  update(id: string, expense: ExtraordinaryExpense) {
    return `This action updates a #${id} extraordinary expense`;
  }

  remove(id: string) {
    return `This action removes a #${id} extraordinary expense`;
  }
}
