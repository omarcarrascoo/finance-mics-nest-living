// src/modules/providers/entities/provider-document.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Provider } from './provider.entity';

export enum DocumentType {
  CONTRACT = 'CONTRACT',
  INSURANCE = 'INSURANCE',
  CERTIFICATION = 'CERTIFICATION',
}

@Entity('provider_documents')
export class ProviderDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'simple-enum',
    enum: ['CONTRACT', 'INSURANCE', 'CERTIFICATION'],
  })
  type: DocumentType;

  @Column()
  url: string;

  @ManyToOne(() => Provider, (p) => p.documents, { onDelete: 'CASCADE' })
  provider: Provider;
}
