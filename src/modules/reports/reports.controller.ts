import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('monthly-balance')
  monthlyBalance(@Query('month') month: number, @Query('year') year: number) {
    return this.reportsService.monthlyBalance(Number(month), Number(year));
  }

  @Get('income-expense')
  incomeExpense(@Query('start') start: string, @Query('end') end: string) {
    return this.reportsService.incomeExpenseStatement(new Date(start), new Date(end));
  }

  @Get('delinquency')
  delinquency() {
    return this.reportsService.delinquencyReport();
  }

  @Get('collection')
  collection(@Query('start') start: string, @Query('end') end: string) {
    return this.reportsService.collectionDetailReport(new Date(start), new Date(end));
  }

  @Get('budget-vs-actual')
  budgetVsActual(@Query('year') year: number) {
    return this.reportsService.budgetVsActual(Number(year));
  }

  @Get('annual-summary')
  annualSummary(@Query('year') year: number) {
    return this.reportsService.annualSummary(Number(year));
  }

  @Get('bank-reconciliation')
  bankReconciliation() {
    return this.reportsService.bankReconciliation();
  }

  @Get('reserve-fund')
  reserveFund() {
    return this.reportsService.reserveFundReport();
  }

  @Get('provider-expenses')
  providerExpenses(@Query('start') start: string, @Query('end') end: string) {
    return this.reportsService.providerExpensesReport(new Date(start), new Date(end));
  }

  @Get('extra-expenses')
  extraExpenses(@Query('start') start: string, @Query('end') end: string) {
    return this.reportsService.extraordinaryExpensesReport(new Date(start), new Date(end));
  }
}
