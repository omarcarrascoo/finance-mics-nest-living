import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReserveFundTransactionsService } from './reserve-fund-transactions.service';
import { ReserveFundTransaction } from './entities/reserve-fund-transaction.entity';

@Controller('reserve-fund-transactions')
export class ReserveFundTransactionsController {
  constructor(
    private readonly reserveFundTransactionsService: ReserveFundTransactionsService,
  ) {}

  @Post()
  create(@Body() tx: ReserveFundTransaction) {
    return this.reserveFundTransactionsService.create(tx);
  }

  @Get()
  findAll() {
    return this.reserveFundTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveFundTransactionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tx: ReserveFundTransaction) {
    return this.reserveFundTransactionsService.update(id, tx);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveFundTransactionsService.remove(id);
  }
}
