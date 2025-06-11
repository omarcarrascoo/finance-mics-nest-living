import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { BudgetItem } from './entities/budget-item.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetsRepo: Repository<Budget>,
    @InjectRepository(BudgetItem)
    private readonly itemsRepo: Repository<BudgetItem>,
  ) {}

  create(budget: Budget) {
    return this.budgetsRepo.save(budget);
  }

  findAll() {
    return this.budgetsRepo.find({ relations: ['items'] });
  }

  findOne(id: string) {
    return this.budgetsRepo.findOne({ where: { id }, relations: ['items'] });
  }

  update(id: string, budget: Partial<Budget>) {
    return this.budgetsRepo.update(id, budget);
  }

  remove(id: string) {
    return this.budgetsRepo.delete(id);
  }
}
