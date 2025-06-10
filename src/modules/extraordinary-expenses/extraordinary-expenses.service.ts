import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtraordinaryExpense } from './entities/extraordinary-expense.entity';

@Injectable()
export class ExtraordinaryExpensesService {
  constructor(
    @InjectRepository(ExtraordinaryExpense)
    private readonly extraRepo: Repository<ExtraordinaryExpense>,
  ) {}

  create(expense: ExtraordinaryExpense) {
    return this.extraRepo.save(expense);
  }

  findAll() {
    return this.extraRepo.find();
  }

  findOne(id: string) {
    return this.extraRepo.findOne({ where: { id } });
  }

  update(id: string, expense: Partial<ExtraordinaryExpense>) {
    return this.extraRepo.update(id, expense);
  }

  remove(id: string) {
    return this.extraRepo.delete(id);
  }
}
