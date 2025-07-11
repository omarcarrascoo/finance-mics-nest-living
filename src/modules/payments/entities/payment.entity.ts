// src/modules/payments/entities/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Category } from '../../categories/entities/category.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { PaymentMethod, PaymentKind, PaymentStatus } from './payment.enums';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Tipo de flujo —
  @Column({ type: 'simple-enum', enum: PaymentKind })
  kind: PaymentKind;

  // — Relaciones opcionales —
  @ManyToOne(() => Resident, (r) => r.payments, { nullable: true })
  @JoinColumn()
  resident?: Resident;

  @ManyToOne(() => Provider, (p) => p.expenses, { nullable: true })
  @JoinColumn()
  provider?: Provider;

  @ManyToOne(() => Employee, (e) => e.payments, { nullable: true })
  @JoinColumn()
  employee?: Employee;

  @ManyToOne(() => Reservation, (res) => res.payments, { nullable: true })
  @JoinColumn()
  reservation?: Reservation;

  // — Centro de costo o categoría —
  @ManyToOne(() => Category, { nullable: true, eager: true })
  @JoinColumn()
  category?: Category;

  // — Montos desglosados —
  @Column('decimal', { precision: 12, scale: 2 })
  grossAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  taxAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  netAmount: number;

  @Column({ length: 3, default: 'MXN' })
  currency: string;

  // — Metadatos —
  @Column({ type: 'simple-enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    default: PaymentStatus.COMPLETED,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  referenceNumber?: string;

  @Column({ nullable: true })
  invoiceUrl?: string;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'date', nullable: true })
  paymentDate?: Date;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  // — Opcionales futuros —
  @Column({ type: 'date', nullable: true })
  scheduledAt?: Date;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
