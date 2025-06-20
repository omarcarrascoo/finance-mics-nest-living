import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProviderExpensesService } from './provider-expenses.service';
import { ProviderExpense } from '../entities/provider-expense.entity';

@Controller('provider-expenses')
export class ProviderExpensesController {
  constructor(
    private readonly providerExpensesService: ProviderExpensesService,
  ) {}

  @Post()
  create(@Body() expense: ProviderExpense) {
    return this.providerExpensesService.create(expense);
  }

  @Get()
  findAll() {
    return this.providerExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerExpensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() expense: ProviderExpense) {
    return this.providerExpensesService.update(id, expense);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerExpensesService.remove(id);
  }
}
