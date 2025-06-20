// src/modules/providers/entities/provider-contact.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Provider } from './provider.entity';

@Entity('provider_contacts')
export class ProviderContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  contactName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  address?: string;

  @Column('simple-array', { nullable: true })
  regionsServed?: string[];

  @OneToOne(() => Provider, (p) => p.contact)
  provider: Provider;
}
