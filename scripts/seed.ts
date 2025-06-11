/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Resident } from '../src/modules/residents/entities/resident.entity';
import {
  Category,
  CategoryType,
} from '../src/modules/categories/entities/category.entity';
import {
  Payment,
  PaymentMethod,
} from '../src/modules/payments/entities/payment.entity';
import { Budget } from '../src/modules/budgets/entities/budget.entity';
import { BudgetItem } from '../src/modules/budgets/entities/budget-item.entity';
import { ProviderExpense } from '../src/modules/provider-expenses/entities/provider-expense.entity';
import { Delinquency } from '../src/modules/delinquencies/entities/delinquency.entity';
import { Maintenance } from '../src/modules/maintenance/entities/maintenance.entity';
import { ExtraordinaryExpense } from '../src/modules/extraordinary-expenses/entities/extraordinary-expense.entity';
import { ReserveFundTransaction } from '../src/modules/reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../src/modules/bank-reconciliation/entities/bank-transaction.entity';

// seed.ts
const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../src/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
});

type SeedResult = void;

function randomDateInMonth(year: number, month: number): Date {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);
  return faker.date.between({ from: start, to: end });
}

function randomDateInYear(year: number): Date {
  return faker.date.between({
    from: new Date(year, 0, 1),
    to: new Date(year, 11, 31, 23, 59, 59),
  });
}

async function seed(): Promise<SeedResult> {
  await dataSource.initialize();

  const residentRepo = dataSource.getRepository(Resident);
  const categoryRepo = dataSource.getRepository(Category);
  const paymentRepo = dataSource.getRepository(Payment);
  const budgetRepo = dataSource.getRepository(Budget);
  const budgetItemRepo = dataSource.getRepository(BudgetItem);
  const providerExpenseRepo = dataSource.getRepository(ProviderExpense);
  const delinquencyRepo = dataSource.getRepository(Delinquency);
  const maintenanceRepo = dataSource.getRepository(Maintenance);
  const extraordinaryExpenseRepo =
    dataSource.getRepository(ExtraordinaryExpense);
  const reserveFundRepo = dataSource.getRepository(ReserveFundTransaction);
  const bankTransactionRepo = dataSource.getRepository(BankTransaction);

  // --- Categories ---
  const categoryData: Array<Partial<Category>> = [
    { name: 'Maintenance', type: CategoryType.MAINTENANCE },
    { name: 'Utilities', type: CategoryType.OTHER },
    { name: 'Insurance', type: CategoryType.OTHER },
    { name: 'Security', type: CategoryType.OTHER },
    { name: 'Landscaping', type: CategoryType.OTHER },
  ];
  const categories: Category[] = categoryRepo.create(
    categoryData as Category[],
  );
  await categoryRepo.save(categories);

  // --- Residents ---
  const residents: Resident[] = [];
  for (let i = 1; i <= 20; i++) {
    const fullName = faker.person.fullName();
    const unit = `${faker.string.alpha({ length: 1 }).toUpperCase()}${faker.number.int({ min: 1, max: 50 })}`;
    const [firstName, lastName] = fullName.split(' ');
    const email = faker.internet.email({ firstName, lastName });
    residents.push(
      residentRepo.create({ name: fullName, unitNumber: unit, email }),
    );
  }
  await residentRepo.save(residents);

  // --- Maintenance ---
  const maintenances: Maintenance[] = [];
  const currentYear: number = new Date().getFullYear();
  residents.forEach((resident) => {
    for (let month = 0; month < 12; month++) {
      maintenances.push(
        maintenanceRepo.create({
          resident,
          amount: 100,
          dueDate: randomDateInMonth(currentYear, month),
          paid: faker.datatype.boolean(),
        }),
      );
    }
  });
  await maintenanceRepo.save(maintenances);

  // --- Payments ---
  const payments: Payment[] = [];
  residents.forEach((resident: Resident) => {
    for (let month = 0; month < 12; month++) {
      const numPayments = faker.number.int({ min: 0, max: 2 });
      for (let j = 0; j < numPayments; j++) {
        const category = faker.helpers.arrayElement(categories);
        const amount = faker.number.float({
          min: 50,
          max: 500,
          fractionDigits: 2,
        });
        const method = faker.helpers.arrayElement(
          Object.values(PaymentMethod),
        ) as PaymentMethod;
        payments.push(
          paymentRepo.create({
            resident,
            category,
            amount,
            method,
            paymentDate: randomDateInMonth(currentYear, month),
          }),
        );
      }
    }
  });
  await paymentRepo.save(payments);

  // --- Budgets and Items ---
  for (let year = currentYear - 1; year <= currentYear; year++) {
    const budget = budgetRepo.create({ year });
    await budgetRepo.save(budget);

    const budgetItems: BudgetItem[] = categories.map((cat: Category) => {
      const plannedAmount = faker.number.float({
        min: 500,
        max: 5000,
        fractionDigits: 1,
      });
      const actualAmount = faker.number.float({
        min: 0,
        max: plannedAmount,
        fractionDigits: 1,
      });
      return budgetItemRepo.create({
        budget,
        category: cat,
        plannedAmount,
        actualAmount,
      });
    });
    await budgetItemRepo.save(budgetItems);
  }

  // --- Provider Expenses ---
  const providerExpenses: ProviderExpense[] = [];
  for (let month = 0; month < 12; month++) {
    const count = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < count; i++) {
      const providerName = faker.company.name();
      const serviceCategory = faker.helpers.arrayElement(categories);
      const totalAmount = faker.number.float({
        min: 200,
        max: 2000,
        fractionDigits: 2,
      });
      providerExpenses.push(
        providerExpenseRepo.create({
          providerName,
          serviceCategory,
          totalAmount,
          expenseDate: randomDateInMonth(currentYear, month),
        }),
      );
    }
  }
  await providerExpenseRepo.save(providerExpenses);

  // --- Delinquencies ---
  const delinquencies: Delinquency[] = [];
  residents.forEach((resident) => {
    const count = faker.number.int({ min: 0, max: 2 });
    for (let i = 0; i < count; i++) {
      const description = faker.lorem.words(3);
      const amount = faker.number.float({
        min: 20,
        max: 200,
        fractionDigits: 2,
      });
      delinquencies.push(
        delinquencyRepo.create({ resident, description, amount }),
      );
    }
  });
  await delinquencyRepo.save(delinquencies);

  // --- Extraordinary Expenses ---
  const extras: ExtraordinaryExpense[] = [];
  for (let month = 0; month < 12; month++) {
    const count = faker.number.int({ min: 0, max: 1 });
    for (let i = 0; i < count; i++) {
      const concept = faker.lorem.words(2);
      const amount = faker.number.float({
        min: 1000,
        max: 10000,
        fractionDigits: 2,
      });
      const approvedBy = faker.person.fullName();
      extras.push(
        extraordinaryExpenseRepo.create({
          concept,
          amount,
          approvedBy,
          date: randomDateInMonth(currentYear, month),
        }),
      );
    }
  }
  await extraordinaryExpenseRepo.save(extras);

  // --- Reserve Fund Transactions ---
  const reserveTxs: ReserveFundTransaction[] = [];
  for (let month = 0; month < 12; month++) {
    const count = faker.number.int({ min: 0, max: 1 });
    for (let i = 0; i < count; i++) {
      const type = faker.helpers.arrayElement(['INCOME', 'EXPENSE']);
      const amount = faker.number.float({
        min: 100,
        max: 1000,
        fractionDigits: 2,
      });
      const notes = i === 0 && month === 0 ? 'Initial fund' : faker.lorem.sentence();
      reserveTxs.push(
        reserveFundRepo.create({
          type,
          amount,
          notes,
          date: randomDateInMonth(currentYear, month),
        }),
      );
    }
  }
  await reserveFundRepo.save(reserveTxs);

  // --- Bank Transactions ---
  const bankTxs: BankTransaction[] = [];
  for (let month = 0; month < 12; month++) {
    const count = faker.number.int({ min: 2, max: 6 });
    for (let i = 0; i < count; i++) {
      const bankDate = randomDateInMonth(currentYear, month);
      const bankAmount = faker.number.float({
        min: -500,
        max: 5000,
        fractionDigits: 2,
      });
      const matched = faker.datatype.boolean();
      const systemReference = faker.string.uuid();
      bankTxs.push(
        bankTransactionRepo.create({
          bankDate,
          bankAmount,
          matched,
          systemReference,
        }),
      );
    }
  }
  await bankTransactionRepo.save(bankTxs);

  console.log('✅ Database seeded successfully with expanded TypeScript data');
  await dataSource.destroy();
}

seed().catch((error: unknown) => {
  console.error('❌ Seeding failed:', error);
  dataSource.destroy();
});
