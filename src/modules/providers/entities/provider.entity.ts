// src/modules/providers/entities/provider.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProviderContact } from './provider-contact.entity';
import { ProviderContract } from './provider-contract.entity';
import { ProviderDocument } from './provider-document.entity';
import { ProviderStatistic } from './provider-statistic.entity';
import { ProviderExpense } from './provider-expense.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Datos básicos —
  @Column()
  name: string;

  @Column({ nullable: true })
  legalName?: string;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn()
  serviceType?: Category;

  // — Relaciones auxiliares —
  @OneToOne(() => ProviderContact, (c) => c.provider, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  contact: ProviderContact;

  @OneToOne(() => ProviderContract, (c) => c.provider, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  contract: ProviderContract;

  @OneToMany(() => ProviderDocument, (d) => d.provider, {
    cascade: true,
    eager: true,
  })
  documents: ProviderDocument[];

  @OneToOne(() => ProviderStatistic, (s) => s.provider, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  statistics: ProviderStatistic;

  @OneToMany(() => ProviderExpense, (e) => e.provider)
  expenses: ProviderExpense[];

  // — Metadatos de estado —
  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  tags?: string[]; // p.ej. VIP, 24/7

  @Column({ type: 'text', nullable: true })
  internalNotes?: string;

  @CreateDateColumn()
  providerCreated: Date;
}
