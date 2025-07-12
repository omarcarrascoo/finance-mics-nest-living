// src/modules/reserve-fund/reserve-fund-transaction.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class ReserveFundTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  type: 'INCOME' | 'EXPENSE';

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  date: Date;
}
