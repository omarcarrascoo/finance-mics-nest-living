import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExtraordinaryExpensesService } from './extraordinary-expenses.service';
import { ExtraordinaryExpense } from './entities/extraordinary-expense.entity';

@Controller('extraordinary-expenses')
export class ExtraordinaryExpensesController {
  constructor(
    private readonly extraordinaryExpensesService: ExtraordinaryExpensesService,
  ) {}

  @Post()
  create(@Body() expense: ExtraordinaryExpense) {
    return this.extraordinaryExpensesService.create(expense);
  }

  @Get()
  findAll() {
    return this.extraordinaryExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraordinaryExpensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() expense: ExtraordinaryExpense) {
    return this.extraordinaryExpensesService.update(id, expense);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraordinaryExpensesService.remove(id);
  }
}
