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
import { PaymentMethod, PaymentKind, PaymentStatus } from './payment.enums';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Tipo y flujo —
  @Column({ type: 'enum', enum: PaymentKind })
  kind: PaymentKind;

  // — Relaciones opcionales según el tipo —
  @ManyToOne(() => Resident, (r) => r.payments, { nullable: true })
  @JoinColumn()
  resident?: Resident;

  @ManyToOne(() => Provider, (p) => p.expenses, { nullable: true })
  @JoinColumn()
  provider?: Provider;

  @ManyToOne(() => Employee, (e) => e.payments, { nullable: true })
  @JoinColumn()
  employee?: Employee;

  // — Centro de costo o categoría general —
  @ManyToOne(() => Category, { nullable: true, eager: true })
  @JoinColumn()
  category?: Category;

  // — Montos detallados para análisis de merma/kpis —
  @Column('decimal', { precision: 12, scale: 2 })
  grossAmount: number; // antes de impuestos o descuentos

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  taxAmount: number; // IVA u otros impuestos

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  discountAmount: number; // descuentos, retenciones, retenciones ISR

  @Column('decimal', { precision: 12, scale: 2 })
  netAmount: number; // importe efectivo final

  @Column({ length: 3, default: 'MXN' })
  currency: string; // ISO currency code

  // — Metadatos y trazabilidad —
  @Column({ type: 'simple-enum', enum: PaymentMethod })
  method: PaymentMethod; // transferencia, tarjeta, efectivo, cheque…

  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    default: PaymentStatus.COMPLETED,
  })
  status: PaymentStatus; // pendiente, completado, fallido

  @Column({ nullable: true })
  referenceNumber?: string; // folio de factura, cheque, transacción

  @Column({ nullable: true })
  invoiceUrl?: string; // enlace a PDF / imagen de comprobante

  @Column({ type: 'date', nullable: true })
  dueDate?: Date; // fecha de vencimiento (por ejemplo cuotas)

  @Column({ type: 'timestamp', nullable: true })
  paymentDate?: Date; // momento en que se efectuó

  @CreateDateColumn()
  createdAt: Date; // registro en base de datos

  // — Campos adicionales para escalabilidad —
  @Column({ type: 'timestamp', nullable: true })
  scheduledAt?: Date; // fecha/hora agendada si es pago futuro

  @Column('simple-array', { nullable: true })
  tags?: string[]; // p.ej. ["urgente","recurrente"]

  @Column({ type: 'text', nullable: true })
  notes?: string; // anotaciones libres
}
