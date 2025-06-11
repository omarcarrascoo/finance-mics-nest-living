import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankReconciliationService } from './bank-reconciliation.service';
import { BankTransaction } from './entities/bank-transaction.entity';

@Controller('bank-transactions')
export class BankReconciliationController {
  constructor(
    private readonly bankReconciliationService: BankReconciliationService,
  ) {}

  @Post()
  create(@Body() tx: BankTransaction) {
    return this.bankReconciliationService.create(tx);
  }

  @Get()
  findAll() {
    return this.bankReconciliationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankReconciliationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tx: BankTransaction) {
    return this.bankReconciliationService.update(id, tx);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankReconciliationService.remove(id);
  }
}
