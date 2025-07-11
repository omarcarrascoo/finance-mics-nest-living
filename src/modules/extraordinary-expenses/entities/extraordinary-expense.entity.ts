// src/modules/extraordinary-expenses/extra-expense.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class ExtraordinaryExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @Column()
  concept: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  approvedBy?: string; // membro del comité

  @CreateDateColumn()
  date: Date;
}
