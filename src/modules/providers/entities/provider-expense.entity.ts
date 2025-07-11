// src/modules/providers/entities/provider-expense.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Provider } from './provider.entity';
import { Condo } from '../../condos/entities/condo.entity';

@Entity('provider_expenses')
export class ProviderExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @ManyToOne(() => Provider, (p) => p.expenses, { onDelete: 'CASCADE' })
  @JoinColumn()
  provider: Provider;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  serviceCategory: Category;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  expenseDate: Date;
}
