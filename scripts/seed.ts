import { DataSource } from 'typeorm';
import { Resident } from '../src/modules/residents/entities/resident.entity';
import { Category, CategoryType } from '../src/modules/categories/entities/category.entity';
import { Payment, PaymentMethod } from '../src/modules/payments/entities/payment.entity';
import { Budget } from '../src/modules/budgets/entities/budget.entity';
import { BudgetItem } from '../src/modules/budgets/entities/budget-item.entity';
import { ProviderExpense } from '../src/modules/provider-expenses/entities/provider-expense.entity';
import { Delinquency } from '../src/modules/delinquencies/entities/delinquency.entity';
import { ExtraordinaryExpense } from '../src/modules/extraordinary-expenses/entities/extraordinary-expense.entity';
import { ReserveFundTransaction } from '../src/modules/reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../src/modules/bank-reconciliation/entities/bank-transaction.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../src/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const residentRepo = dataSource.getRepository(Resident);
  const categoryRepo = dataSource.getRepository(Category);
  const paymentRepo = dataSource.getRepository(Payment);
  const budgetRepo = dataSource.getRepository(Budget);
  const budgetItemRepo = dataSource.getRepository(BudgetItem);
  const providerExpenseRepo = dataSource.getRepository(ProviderExpense);
  const delinquencyRepo = dataSource.getRepository(Delinquency);
  const extraordinaryExpenseRepo = dataSource.getRepository(ExtraordinaryExpense);
  const reserveFundRepo = dataSource.getRepository(ReserveFundTransaction);
  const bankTransactionRepo = dataSource.getRepository(BankTransaction);

  // categories
  const maintenanceCat = categoryRepo.create({ name: 'Maintenance', type: CategoryType.MAINTENANCE });
  const otherCat = categoryRepo.create({ name: 'Misc', type: CategoryType.OTHER });
  await categoryRepo.save([maintenanceCat, otherCat]);

  // residents
  const john = residentRepo.create({ name: 'John Doe', unitNumber: 'A1', email: 'john@example.com' });
  const jane = residentRepo.create({ name: 'Jane Smith', unitNumber: 'B2', email: 'jane@example.com' });
  await residentRepo.save([john, jane]);

  // payments
  const payment1 = paymentRepo.create({ resident: john, category: maintenanceCat, amount: 100, method: PaymentMethod.TRANSFER });
  const payment2 = paymentRepo.create({ resident: jane, category: otherCat, amount: 150, method: PaymentMethod.CARD });
  await paymentRepo.save([payment1, payment2]);

  // budget and items
  const budget = budgetRepo.create({ year: new Date().getFullYear() });
  await budgetRepo.save(budget);
  const item1 = budgetItemRepo.create({ budget, category: maintenanceCat, plannedAmount: 1000, actualAmount: 200 });
  const item2 = budgetItemRepo.create({ budget, category: otherCat, plannedAmount: 500, actualAmount: 100 });
  await budgetItemRepo.save([item1, item2]);

  // provider expenses
  const expense = providerExpenseRepo.create({ providerName: 'CleanCo', serviceCategory: maintenanceCat, totalAmount: 300 });
  await providerExpenseRepo.save(expense);

  // delinquencies
  const delinquency = delinquencyRepo.create({ description: 'Late fee', amount: 50 });
  await delinquencyRepo.save(delinquency);

  // extraordinary expenses
  const extraExpense = extraordinaryExpenseRepo.create({ concept: 'Roof repair', amount: 2000, approvedBy: 'Board' });
  await extraordinaryExpenseRepo.save(extraExpense);

  // reserve fund transactions
  const reserveTx = reserveFundRepo.create({ amount: 500, type: 'INCOME', notes: 'Initial fund' });
  await reserveFundRepo.save(reserveTx);

  // bank transactions
  const bankTx = bankTransactionRepo.create({ bankDate: new Date(), bankAmount: 500, matched: false, systemReference: 'initial' });
  await bankTransactionRepo.save(bankTx);

  console.log('Database seeded successfully');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  dataSource.destroy();
});

