import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { ProviderExpense } from '../provider-expenses/entities/provider-expense.entity';
import { ExtraordinaryExpense } from '../extraordinary-expenses/entities/extraordinary-expense.entity';
import { ReserveFundTransaction } from '../reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../bank-reconciliation/entities/bank-transaction.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { BudgetItem } from '../budgets/entities/budget-item.entity';
import { Delinquency } from '../delinquencies/entities/delinquency.entity';
import { Resident } from '../residents/entities/resident.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(ProviderExpense)
    private readonly providerRepo: Repository<ProviderExpense>,
    @InjectRepository(ExtraordinaryExpense)
    private readonly extraRepo: Repository<ExtraordinaryExpense>,
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
  ) {}

  async monthlyBalance(month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    const incomes = await this.paymentRepo.sum('amount', {
      where: { paymentDate: Between(start, end) },
    });
    const provider = await this.providerRepo.sum('totalAmount', {
      where: { expenseDate: Between(start, end) },
    });
    const extras = await this.extraRepo.sum('amount', {
      where: { date: Between(start, end) },
    });
    const expenses = (provider ?? 0) + (extras ?? 0);
    return {
      incomes: incomes ?? 0,
      expenses,
      balance: (incomes ?? 0) - expenses,
    };
  }

  async incomeExpenseStatement(start: Date, end: Date) {
    const payments = await this.paymentRepo.find({
      where: { paymentDate: Between(start, end) },
      relations: ['category'],
    });
    const provider = await this.providerRepo.find({
      where: { expenseDate: Between(start, end) },
      relations: ['serviceCategory'],
    });
    const extras = await this.extraRepo.find({ where: { date: Between(start, end) } });
    return { payments, providerExpenses: provider, extraordinaryExpenses: extras };
  }

  async delinquencyReport() {
    return this.delinquencyRepo.find();
  }

  async collectionDetailReport(start: Date, end: Date) {
    return this.paymentRepo.find({
      where: { paymentDate: Between(start, end) },
      relations: ['resident'],
    });
  }

  async budgetVsActual(year: number) {
    const budget = await this.budgetRepo.findOne({ where: { year }, relations: ['items'] });
    if (!budget) return null;
    return budget.items.map((i) => ({
      category: i.category?.name,
      planned: i.plannedAmount,
      actual: i.actualAmount,
      variance: i.plannedAmount ? ((i.actualAmount - i.plannedAmount) / i.plannedAmount) * 100 : 0,
    }));
  }

  async annualSummary(year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59);
    const incomes = await this.paymentRepo.sum('amount', {
      where: { paymentDate: Between(start, end) },
    });
    const provider = await this.providerRepo.sum('totalAmount', {
      where: { expenseDate: Between(start, end) },
    });
    const extras = await this.extraRepo.sum('amount', { where: { date: Between(start, end) } });
    return {
      incomes: incomes ?? 0,
      expenses: (provider ?? 0) + (extras ?? 0),
    };
  }

  async bankReconciliation() {
    return this.bankRepo.find();
  }

  async reserveFundReport() {
    return this.reserveRepo.find();
  }

  async providerExpensesReport(start: Date, end: Date) {
    return this.providerRepo.find({ where: { expenseDate: Between(start, end) } });
  }

  async extraordinaryExpensesReport(start: Date, end: Date) {
    return this.extraRepo.find({ where: { date: Between(start, end) } });
  }
}
