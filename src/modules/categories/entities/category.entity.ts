// src/modules/categories/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Condo } from '../../condos/entities/condo.entity';

export enum CategoryType {
  MAINTENANCE = 'maintenance',
  OTHER = 'other',
  EXTRAORDINARY = 'extraordinary',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @Column()
  name: string;

  @Column({ type: 'simple-enum', enum: CategoryType })
  type: CategoryType;
}
