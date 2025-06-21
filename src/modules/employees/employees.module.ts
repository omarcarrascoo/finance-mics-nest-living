// src/modules/employees/employees.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { EmployeeFiscal } from './entities/employee-fiscal.entity';
import { EmployeeSocialSecurity } from './entities/employee-ssn.entity';
import { EmployeeContract } from './entities/employee-contract.entity';
import { EmployeeSalary } from './entities/employee-salary.entity';
import { EmployeeWorkSchedule } from './entities/employee-work-schedule.entity';
import { EmployeePayrollRecord } from './entities/employee-payroll.entity';
import { EmployeeLeaveBalance } from './entities/employee-leave.entity';
import { EmployeeAbsence } from './entities/employee-absence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeFiscal,
      EmployeeSocialSecurity,
      EmployeeContract,
      EmployeeSalary,
      EmployeeWorkSchedule,
      EmployeePayrollRecord,
      EmployeeLeaveBalance,
      EmployeeAbsence,
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
