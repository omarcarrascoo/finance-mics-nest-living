import { Injectable } from '@nestjs/common';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetsService {
  create(budget: Budget) {
    return `This action adds a new budget`;
  }

  findAll() {
    return `This action returns all budgets`;
  }

  findOne(id: string) {
    return `This action returns a #${id} budget`;
  }

  update(id: string, budget: Budget) {
    return `This action updates a #${id} budget`;
  }

  remove(id: string) {
    return `This action removes a #${id} budget`;
  }
}
