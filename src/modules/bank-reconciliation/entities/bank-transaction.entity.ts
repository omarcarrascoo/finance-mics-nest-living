// src/modules/bank-reconciliation/transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class BankTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @Column()
  bankDate: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  bankAmount: number;

  @Column({ default: false })
  matched: boolean;

  @Column({ nullable: true })
  systemReference: string; // paymentId o descripción
}
