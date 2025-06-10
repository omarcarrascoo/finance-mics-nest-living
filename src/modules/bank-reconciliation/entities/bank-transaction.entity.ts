// src/modules/bank-reconciliation/transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BankTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bankDate: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  bankAmount: number;

  @Column({ default: false })
  matched: boolean;

  @Column({ nullable: true })
  systemReference: string; // paymentId o descripción
}
