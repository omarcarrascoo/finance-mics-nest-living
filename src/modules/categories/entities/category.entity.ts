// src/modules/categories/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CategoryType {
  MAINTENANCE = 'maintenance',
  OTHER = 'other',
  EXTRAORDINARY = 'extraordinary',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;
}
