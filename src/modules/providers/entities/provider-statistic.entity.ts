// src/modules/providers/entities/provider-statistic.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Provider } from './provider.entity';

@Entity('provider_statistics')
export class ProviderStatistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  totalServices: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  totalSpend: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  avgCostPerService: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  avgRating: number; // 1.00 – 5.00

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  onTimeRate: number; // porcentaje

  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  avgResponseTimeHrs: number;

  @Column({ type: 'date', nullable: true })
  lastServiceDate?: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  delayRate: number; // porcentaje

  @Column('int', { default: 0 })
  pendingInvoices: number;

  @OneToOne(() => Provider, (p) => p.statistics)
  provider: Provider;
}
