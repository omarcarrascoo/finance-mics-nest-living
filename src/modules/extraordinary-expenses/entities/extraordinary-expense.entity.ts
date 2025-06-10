// src/modules/extraordinary-expenses/extra-expense.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ExtraordinaryExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  concept: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  approvedBy?: string; // membro del comité

  @CreateDateColumn()
  date: Date;
}
