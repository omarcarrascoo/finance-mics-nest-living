import { Module } from '@nestjs/common';
import { ExtraordinaryExpensesService } from './extraordinary-expenses.service';
import { ExtraordinaryExpensesController } from './extraordinary-expenses.controller';

@Module({
  controllers: [ExtraordinaryExpensesController],
  providers: [ExtraordinaryExpensesService],
})
export class ExtraordinaryExpensesModule {}
