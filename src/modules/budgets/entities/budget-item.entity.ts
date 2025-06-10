// src/modules/budgets/budget-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Budget } from './budget.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class BudgetItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Budget, (b) => b.items)
  budget: Budget;

  @ManyToOne(() => Category)
  category: Category;

  @Column('decimal', { precision: 12, scale: 2 })
  plannedAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  actualAmount: number;
}
