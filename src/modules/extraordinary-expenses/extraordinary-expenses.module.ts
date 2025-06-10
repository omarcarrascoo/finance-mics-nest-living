import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraordinaryExpensesService } from './extraordinary-expenses.service';
import { ExtraordinaryExpensesController } from './extraordinary-expenses.controller';
import { ExtraordinaryExpense } from './entities/extraordinary-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExtraordinaryExpense])],
  controllers: [ExtraordinaryExpensesController],
  providers: [ExtraordinaryExpensesService],
})
export class ExtraordinaryExpensesModule {}
