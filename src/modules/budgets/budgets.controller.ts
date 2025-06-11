import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { Budget } from './entities/budget.entity';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() budget: Budget) {
    return this.budgetsService.create(budget);
  }

  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() budget: Budget) {
    return this.budgetsService.update(id, budget);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(id);
  }
}
