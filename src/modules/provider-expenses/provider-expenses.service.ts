import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderExpense } from './entities/provider-expense.entity';

@Injectable()
export class ProviderExpensesService {
  constructor(
    @InjectRepository(ProviderExpense)
    private readonly expensesRepo: Repository<ProviderExpense>,
  ) {}

  create(expense: ProviderExpense) {
    return this.expensesRepo.save(expense);
  }

  findAll() {
    return this.expensesRepo.find({ relations: ['serviceCategory'] });
  }

  findOne(id: string) {
    return this.expensesRepo.findOne({
      where: { id },
      relations: ['serviceCategory'],
    });
  }

  update(id: string, expense: Partial<ProviderExpense>) {
    return this.expensesRepo.update(id, expense);
  }

  remove(id: string) {
    return this.expensesRepo.delete(id);
  }
}
