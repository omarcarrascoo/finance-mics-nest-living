import { Module } from '@nestjs/common';
import { ExtraordinaryExpensesService } from './extraordinary-expenses.service';

@Module({
  providers: [ExtraordinaryExpensesService],
})
export class ExtraordinaryExpensesModule {}
