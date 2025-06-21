// src/modules/employees/entities/employee-contract.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_contracts')
export class EmployeeContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  department?: string;

  @Column({ type: 'date' })
  contractStart: string;

  @Column({ type: 'date', nullable: true })
  contractEnd?: string;

  @Column({ default: false })
  probationPeriod: boolean;

  @Column({ type: 'date', nullable: true })
  probationEndDate?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToOne(() => Employee, (e) => e.contract)
  employee: Employee;
}
