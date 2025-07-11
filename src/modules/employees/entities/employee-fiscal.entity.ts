// src/modules/employees/entities/employee-fiscal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

export enum TaxRegime {
  PERSONAS_FISICAS = 'PERSONAS_FISICAS',
  PERSONAS_MORALES = 'PERSONAS_MORALES',
  RIF = 'RIF',
}

@Entity('employee_fiscal')
export class EmployeeFiscal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  rfc: string;

  @Column({ type: 'simple-enum', enum: TaxRegime })
  taxRegime: TaxRegime;

  @Column({ nullable: true })
  fiscalAddress?: string;

  @Column({ nullable: true })
  cfdiUse?: string; // CFDI usage code

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToOne(() => Employee, (e) => e.fiscal)
  employee: Employee;
}
