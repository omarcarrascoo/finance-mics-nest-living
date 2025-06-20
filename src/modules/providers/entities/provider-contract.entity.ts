// src/modules/providers/entities/provider-contract.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Provider } from './provider.entity';

@Entity('provider_contracts')
export class ProviderContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  startDate: string; // p.ej. “2025-01-15”

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column()
  paymentTerms: string; // p.ej. “Net30”

  @Column()
  currency: string; // “MXN”, “USD”

  @Column({ nullable: true })
  rfc?: string;

  @Column({ nullable: true })
  bankAccount?: string; // CLABE o IBAN

  @OneToOne(() => Provider, (p) => p.contract)
  provider: Provider;
}
