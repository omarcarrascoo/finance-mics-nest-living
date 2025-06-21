import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Resident } from '../src/modules/residents/entities/resident.entity';
import { ResidentContact } from '../src/modules/residents/entities/resident-contact.entity';
import { ResidentLease } from '../src/modules/residents/entities/resident-lease.entity';
import { ResidentDocument } from '../src/modules/residents/entities/resident-document.entity';
import { ResidentStatistic } from '../src/modules/residents/entities/resident-statistic.entity';
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
import { Delinquency } from '../src/modules/delinquencies/entities/delinquency.entity';
import { Maintenance } from '../src/modules/maintenance/entities/maintenance.entity';
import { ExtraordinaryExpense } from '../src/modules/extraordinary-expenses/entities/extraordinary-expense.entity';
import { ReserveFundTransaction } from '../src/modules/reserve-fund-transactions/entities/reserve-fund-transaction.entity';
import { BankTransaction } from '../src/modules/bank-reconciliation/entities/bank-transaction.entity';
import { Provider } from '../src/modules/providers/entities/provider.entity';
import { DocumentType } from '../src/modules/providers/entities/provider-document.entity';
import { ProviderExpense } from '../src/modules/providers/entities/provider-expense.entity';

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
  const residentContactRepo = dataSource.getRepository(ResidentContact);
  const residentLeaseRepo = dataSource.getRepository(ResidentLease);
  const residentDocumentRepo = dataSource.getRepository(ResidentDocument);
  const residentStatisticRepo = dataSource.getRepository(ResidentStatistic);
  const categoryRepo = dataSource.getRepository(Category);
  const paymentRepo = dataSource.getRepository(Payment);
  const budgetRepo = dataSource.getRepository(Budget);
  const budgetItemRepo = dataSource.getRepository(BudgetItem);
  const providerRepo = dataSource.getRepository(Provider);
  const providerExpenseRepo = dataSource.getRepository(ProviderExpense);
  const delinquencyRepo = dataSource.getRepository(Delinquency);
  const maintenanceRepo = dataSource.getRepository(Maintenance);
  const extraordinaryExpenseRepo =
    dataSource.getRepository(ExtraordinaryExpense);
  const reserveFundRepo = dataSource.getRepository(ReserveFundTransaction);
  const bankTransactionRepo = dataSource.getRepository(BankTransaction);

  const currentYear: number = new Date().getFullYear();

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
    const phone = faker.phone.number();
    const moveIn = randomDateInYear(currentYear - 1)
      .toISOString()
      .split('T')[0];
    const maybeMoveOut = faker.datatype.boolean()
      ? randomDateInYear(currentYear + 1)
          .toISOString()
          .split('T')[0]
      : undefined;

    const primaryContact = residentContactRepo.create({
      type: 'PRIMARY',
      name: fullName,
      phone,
      email,
    });
    await residentContactRepo.save(primaryContact);

    const lease = residentLeaseRepo.create({
      startDate: moveIn,
      endDate: maybeMoveOut,
      rentAmount: faker.number.int({ min: 800, max: 1500 }),
      securityDeposit: 1000,
      leaseDocumentUrl: faker.internet.url(),
      terms: faker.lorem.sentence(),
    });
    await residentLeaseRepo.save(lease);

    const statistics = residentStatisticRepo.create({
      totalPayments: faker.number.int({ min: 0, max: 24 }),
      totalPaid: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
      avgPaymentDelayDays: faker.number.float({
        min: 0,
        max: 10,
        fractionDigits: 2,
      }),
      lastPaymentDate: randomDateInYear(currentYear)
        .toISOString()
        .split('T')[0],
      maintenanceRequests: faker.number.int({ min: 0, max: 5 }),
      delinquenciesCount: faker.number.int({ min: 0, max: 3 }),
      balanceOwed: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
      delinquencyRate: faker.number.float({
        min: 0,
        max: 100,
        fractionDigits: 2,
      }),
    });
    await residentStatisticRepo.save(statistics);

    const resident = residentRepo.create({
      fullName,
      unitNumber: unit,
      email,
      phone,
      moveInDate: moveIn,
      moveOutDate: maybeMoveOut,
      status: 'ACTIVE',
      primaryContact,
      lease,
      statistics,
      tags: faker.helpers.arrayElements(['VIP', 'PetFriendly'], {
        min: 0,
        max: 2,
      }),
      internalNotes: faker.lorem.sentence(),
    });
    await residentRepo.save(resident);

    primaryContact.resident = resident;
    await residentContactRepo.save(primaryContact);

    const emergency = residentContactRepo.create({
      type: 'EMERGENCY',
      name: faker.person.fullName(),
      relationship: faker.helpers.arrayElement(['Friend', 'Parent', 'Sibling']),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      resident,
    });
    await residentContactRepo.save(emergency);

    const documents = [
      residentDocumentRepo.create({
        type: 'LEASE',
        url: faker.internet.url(),
        resident,
      }),
      residentDocumentRepo.create({
        type: 'ID',
        url: faker.internet.url(),
        resident,
      }),
    ];
    await residentDocumentRepo.save(documents);

    resident.emergencyContacts = [emergency];
    resident.documents = documents;
    residents.push(resident);
  }

  // --- Maintenance ---
  const maintenances: Maintenance[] = [];
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

  // --- Providers ---
  const providers: Provider[] = [];
  for (let i = 0; i < 8; i++) {
    const name = faker.company.name();
    const serviceType = faker.helpers.arrayElement(categories);
    const start = randomDateInYear(currentYear - 1);
    const maybeEnd = faker.datatype.boolean()
      ? randomDateInYear(currentYear + 1)
      : undefined;
    providers.push(
      providerRepo.create({
        name,
        legalName: `${name} S.A. de C.V.`,
        serviceType,
        contact: {
          contactName: faker.person.fullName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
          website: faker.internet.url(),
          address: faker.location.streetAddress(),
          regionsServed: [faker.location.city(), faker.location.city()],
        },
        contract: {
          startDate: start.toISOString().split('T')[0],
          endDate: maybeEnd ? maybeEnd.toISOString().split('T')[0] : undefined,
          paymentTerms: faker.helpers.arrayElement(['Net30', 'Net45', 'Net60']),
          currency: faker.helpers.arrayElement(['MXN', 'USD']),
          rfc: faker.string.alphanumeric({ length: 13, casing: 'upper' }),
          bankAccount: faker.finance.accountNumber(18),
        },
        documents: [
          {
            type: DocumentType.CONTRACT,
            url: faker.internet.url(),
          },
        ],
        statistics: {
          totalServices: faker.number.int({ min: 1, max: 40 }),
          totalSpend: faker.number.float({
            min: 1000,
            max: 50000,
            fractionDigits: 2,
          }),
          avgCostPerService: faker.number.float({
            min: 100,
            max: 2000,
            fractionDigits: 2,
          }),
          avgRating: faker.number.float({
            min: 3,
            max: 5,
            fractionDigits: 2,
          }),
          onTimeRate: faker.number.float({
            min: 75,
            max: 100,
            fractionDigits: 2,
          }),
          avgResponseTimeHrs: faker.number.float({
            min: 1,
            max: 24,
            fractionDigits: 2,
          }),
          lastServiceDate: randomDateInYear(currentYear)
            .toISOString()
            .split('T')[0],
          delayRate: faker.number.float({
            min: 0,
            max: 20,
            fractionDigits: 2,
          }),
          pendingInvoices: faker.number.int({ min: 0, max: 5 }),
        },
        tags: faker.helpers.arrayElements(['VIP', '24/7', 'priority'], {
          min: 0,
          max: 2,
        }),
        internalNotes: faker.lorem.sentence(),
      }),
    );
  }
  await providerRepo.save(providers);

  // --- Provider Expenses ---
  const providerExpenses: ProviderExpense[] = [];
  providers.forEach((provider) => {
    for (let month = 0; month < 12; month++) {
      const count = faker.number.int({ min: 0, max: 2 });
      for (let i = 0; i < count; i++) {
        const serviceCategory = faker.helpers.arrayElement(categories);
        const totalAmount = faker.number.float({
          min: 200,
          max: 2000,
          fractionDigits: 2,
        });
        providerExpenses.push(
          providerExpenseRepo.create({
            provider,
            serviceCategory,
            totalAmount,
            expenseDate: randomDateInMonth(currentYear, month),
          }),
        );
      }
    }
  });
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
      const notes =
        i === 0 && month === 0 ? 'Initial fund' : faker.lorem.sentence();
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
