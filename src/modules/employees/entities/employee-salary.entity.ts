// src/modules/employees/entities/employee-salary.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

export enum SalaryType {
  SALARIED = 'SALARIED',
  HOURLY = 'HOURLY',
}

export enum PayFrequency {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

@Entity('employee_salaries')
export class EmployeeSalary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2 })
  baseSalary: number;

  @Column({ type: 'enum', enum: SalaryType })
  salaryType: SalaryType;

  @Column({ type: 'enum', enum: PayFrequency })
  frequency: PayFrequency;

  @Column({ nullable: true })
  bankAccount?: string; // CLABE/IBAN para depósito

  @OneToOne(() => Employee, (e) => e.salary)
  employee: Employee;
}
