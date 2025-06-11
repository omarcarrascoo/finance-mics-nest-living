// src/modules/payments/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';
import { Category } from '../../categories/entities/category.entity';

export enum PaymentMethod {
  TRANSFER,
  CARD,
  CASH,
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resident, (r) => r.payments)
  resident: Resident;

  @ManyToOne(() => Category)
  category: Category;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'simple-enum' })
  method: PaymentMethod;

  @CreateDateColumn()
  paymentDate: Date;
}
