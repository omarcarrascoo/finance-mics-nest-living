// src/modules/budgets/budget.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BudgetItem } from './budget-item.entity';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @Column()
  year: number;

  @OneToMany(() => BudgetItem, (item) => item.budget, { cascade: true })
  items: BudgetItem[];
}
