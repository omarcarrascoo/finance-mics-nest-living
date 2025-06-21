// src/modules/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, LessThan, In } from 'typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentKind, PaymentStatus } from '../payments/entities/payment.enums';
import { ReserveFundTransaction } from '../reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../bank-reconciliation/entities/bank-transaction.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { BudgetItem } from '../budgets/entities/budget-item.entity';
import { Delinquency } from '../delinquencies/entities/delinquency.entity';
import { Resident } from '../residents/entities/resident.entity';
import { Maintenance } from '../maintenance/entities/maintenance.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(ReserveFundTransaction)
    private readonly reserveRepo: Repository<ReserveFundTransaction>,

    @InjectRepository(BankTransaction)
    private readonly bankRepo: Repository<BankTransaction>,

    @InjectRepository(Budget)
    private readonly budgetRepo: Repository<Budget>,

    @InjectRepository(BudgetItem)
    private readonly budgetItemRepo: Repository<BudgetItem>,

    @InjectRepository(Delinquency)
    private readonly delinquencyRepo: Repository<Delinquency>,

    @InjectRepository(Resident)
    private readonly residentRepo: Repository<Resident>,

    @InjectRepository(Maintenance)
    private readonly maintenanceRepo: Repository<Maintenance>,
  ) {}

  // Ajuste en sum(): el segundo parámetro es directamente el objeto de condiciones, sin “where”
  async monthlyBalance(month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    // Ingresos de residentes
    const incomes = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.RESIDENT_FEE,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    // Gastos a proveedores
    const providerExpenses = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.PROVIDER,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    // Nómina
    const payrollExpenses = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.PAYROLL,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    // Impuestos
    const taxExpenses = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.TAX,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    // Extraordinarios
    const extraExpenses = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.EXTRAORDINARY,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    const totalExpenses =
      (providerExpenses ?? 0) +
      (payrollExpenses ?? 0) +
      (taxExpenses ?? 0) +
      (extraExpenses ?? 0);

    return {
      incomes: incomes ?? 0,
      expenses: totalExpenses,
      balance: (incomes ?? 0) - totalExpenses,
    };
  }

  async incomeExpenseStatement(start: Date, end: Date) {
    const payments = await this.paymentRepo.find({
      where: { paymentDate: Between(start, end) },
      relations: ['resident', 'provider', 'employee', 'category'],
    });

    return { payments };
  }

  async delinquencyReport() {
    const fines = await this.delinquencyRepo.find({ relations: ['resident'] });
    const maintenance = await this.maintenanceRepo.find({
      where: { paid: false, dueDate: LessThan(new Date()) },
      relations: ['resident'],
    });
    return { fines, maintenance };
  }

  async collectionDetailReport(start: Date, end: Date) {
    return this.paymentRepo.find({
      where: {
        paymentDate: Between(start, end),
        status: PaymentStatus.COMPLETED,
      },
      relations: ['resident', 'category'],
    });
  }

  async budgetVsActual(year: number) {
    const budget = await this.budgetRepo.findOne({
      where: { year },
      relations: ['items', 'items.category'],
    });
    if (!budget) return null;

    return budget.items.map((i) => ({
      category: i.category?.name,
      planned: i.plannedAmount,
      actual: i.actualAmount,
      variance: i.plannedAmount
        ? ((i.actualAmount - i.plannedAmount) / i.plannedAmount) * 100
        : 0,
    }));
  }

  async annualSummary(year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59);

    const incomes = await this.paymentRepo.sum('netAmount', {
      kind: PaymentKind.RESIDENT_FEE,
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
    });

    const expenses = await this.paymentRepo.sum('netAmount', {
      paymentDate: Between(start, end),
      status: PaymentStatus.COMPLETED,
      kind: In([
        PaymentKind.PROVIDER,
        PaymentKind.PAYROLL,
        PaymentKind.TAX,
        PaymentKind.EXTRAORDINARY,
      ]),
    });

    return {
      incomes: incomes ?? 0,
      expenses: expenses ?? 0,
    };
  }

  async bankReconciliation() {
    return this.bankRepo.find();
  }

  async reserveFundReport() {
    return this.reserveRepo.find();
  }

  async providerExpensesReport(start: Date, end: Date) {
    return this.paymentRepo.find({
      where: {
        kind: PaymentKind.PROVIDER,
        paymentDate: Between(start, end),
        status: PaymentStatus.COMPLETED,
      },
      relations: ['provider', 'category'],
      order: { paymentDate: 'ASC' },
    });
  }

  async extraordinaryExpensesReport(start: Date, end: Date) {
    return this.paymentRepo.find({
      where: {
        kind: PaymentKind.EXTRAORDINARY,
        paymentDate: Between(start, end),
        status: PaymentStatus.COMPLETED,
      },
      relations: ['category'],
    });
  }
}
