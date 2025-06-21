// src/modules/employees/entities/employee-ssn.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_social_security')
export class EmployeeSocialSecurity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  imssNumber: string; // Número de seguro social

  @Column({ type: 'date', nullable: true })
  registrationDate?: string;

  @Column({ nullable: true })
  regime?: string; // Régimen IMSS

  @OneToOne(() => Employee, (e) => e.socialSecurity)
  employee: Employee;
}
