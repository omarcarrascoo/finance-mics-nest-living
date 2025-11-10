import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resident } from './entities/resident.entity';
import { ResidentContact } from './entities/resident-contact.entity';
import { ResidentDocument } from './entities/resident-document.entity';
import { ResidentLease } from './entities/resident-lease.entity';
import { ResidentStatistic } from './entities/resident-statistic.entity';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private readonly residentsRepo: Repository<Resident>,
  ) {}

  async create(resident: Resident) {
    const entity = this.residentsRepo.create();
    const merged = this.mergeResidentRelations(entity, resident);
    const saved = await this.residentsRepo.save(merged);
    return this.serializeResident(saved);
  }

  async findAll() {
    const residents = await this.residentsRepo.find({
      relations: ['payments', 'reservations'],
    });

    return residents.map((resident) => this.serializeResident(resident)!);
  }

  async findOne(id: string) {
    const resident = await this.residentsRepo.findOne({
      where: { id },
      relations: ['payments', 'reservations'],
    });

    return this.serializeResident(resident);
  }

  async update(id: string, resident: Partial<Resident>) {
    const existing = await this.residentsRepo.findOne({
      where: { id },
      relations: [
        'primaryContact',
        'emergencyContacts',
        'documents',
        'lease',
        'statistics',
      ],
    });

    if (!existing) {
      throw new NotFoundException(`Resident with id "${id}" not found`);
    }

    const merged = this.mergeResidentRelations(existing, resident);
    const saved = await this.residentsRepo.save(merged);
    return this.serializeResident(saved);
  }

  remove(id: string) {
    return this.residentsRepo.delete(id);
  }

  private mergeResidentRelations(
    target: Resident,
    source: Partial<Resident>,
  ): Resident {
    const {
      primaryContact,
      emergencyContacts,
      documents,
      lease,
      statistics,
      ...rest
    } = source;

    Object.assign(target, rest);

    if (primaryContact !== undefined) {
      target.primaryContact = primaryContact
        ? this.preparePrimaryContact(target, primaryContact)
        : undefined;
    }

    if (emergencyContacts !== undefined) {
      target.emergencyContacts = emergencyContacts
        ? emergencyContacts.map((contact) =>
            this.prepareEmergencyContact(target, contact),
          )
        : [];
    }

    if (documents !== undefined) {
      target.documents = documents
        ? documents.map((document) =>
            this.prepareDocument(target, document),
          )
        : [];
    }

    if (lease !== undefined) {
      target.lease = lease
        ? this.prepareLease(target, lease)
        : undefined;
    }

    if (statistics !== undefined) {
      target.statistics = statistics
        ? this.prepareStatistics(target, statistics)
        : undefined;
    }

    return target;
  }

  private preparePrimaryContact(
    resident: Resident,
    contact: Partial<ResidentContact>,
  ): ResidentContact {
    const prepared: ResidentContact = {
      ...(resident.primaryContact ?? {}),
      ...contact,
      type: 'PRIMARY',
    } as ResidentContact;

    prepared.primaryOf = resident;

    if (resident.id) {
      prepared.residentPrimaryId = resident.id;
    }

    return prepared;
  }

  private prepareEmergencyContact(
    resident: Resident,
    contact: Partial<ResidentContact>,
  ): ResidentContact {
    const prepared: ResidentContact = {
      ...contact,
      type: 'EMERGENCY',
    } as ResidentContact;

    prepared.resident = resident;

    if (resident.id) {
      prepared.residentId = resident.id;
    }

    return prepared;
  }

  private prepareDocument(
    resident: Resident,
    document: Partial<ResidentDocument>,
  ): ResidentDocument {
    const prepared: ResidentDocument = {
      ...document,
    } as ResidentDocument;

    prepared.resident = resident;

    if (resident.id) {
      prepared.residentId = resident.id;
    }

    return prepared;
  }

  private prepareLease(
    resident: Resident,
    lease: Partial<ResidentLease>,
  ): ResidentLease {
    const prepared: ResidentLease = {
      ...(resident.lease ?? {}),
      ...lease,
    } as ResidentLease;

    prepared.resident = resident;

    if (resident.id) {
      prepared.residentId = resident.id;
    }

    return prepared;
  }

  private prepareStatistics(
    resident: Resident,
    statistics: Partial<ResidentStatistic>,
  ): ResidentStatistic {
    const prepared: ResidentStatistic = {
      ...(resident.statistics ?? {}),
      ...statistics,
    } as ResidentStatistic;

    prepared.resident = resident;

    if (resident.id) {
      prepared.residentId = resident.id;
    }

    return prepared;
  }

  private serializeResident(resident?: Resident | null): Resident | null {
    if (!resident) {
      return resident ?? null;
    }

    const {
      primaryContact,
      emergencyContacts,
      documents,
      lease,
      statistics,
      payments,
      maintenance,
      delinquencies,
      reservations,
      ...rest
    } = resident;

    const clone: Resident = {
      ...rest,
    } as Resident;

    if (primaryContact) {
      const sanitized = { ...primaryContact } as ResidentContact;
      (sanitized as any).primaryOf = undefined;
      (sanitized as any).resident = undefined;
      clone.primaryContact = sanitized;
    }

    if (emergencyContacts) {
      clone.emergencyContacts = emergencyContacts.map((contact) => {
        const sanitized = { ...contact } as ResidentContact;
        (sanitized as any).resident = undefined;
        (sanitized as any).primaryOf = undefined;
        return sanitized;
      });
    }

    if (documents) {
      clone.documents = documents.map((document) => {
        const sanitized = { ...document } as ResidentDocument;
        (sanitized as any).resident = undefined;
        return sanitized;
      });
    }

    if (lease) {
      const sanitized = { ...lease } as ResidentLease;
      (sanitized as any).resident = undefined;
      clone.lease = sanitized;
    }

    if (statistics) {
      const sanitized = { ...statistics } as ResidentStatistic;
      (sanitized as any).resident = undefined;
      clone.statistics = sanitized;
    }

    if (payments) {
      clone.payments = payments.map((payment) => ({
        ...payment,
        resident: undefined,
      })) as any;
    }

    if (maintenance) {
      clone.maintenance = maintenance.map((request) => ({
        ...request,
        resident: undefined,
      })) as any;
    }

    if (delinquencies) {
      clone.delinquencies = delinquencies.map((record) => ({
        ...record,
        resident: undefined,
      })) as any;
    }

    if (reservations) {
      clone.reservations = reservations.map((reservation) => ({
        ...reservation,
        resident: undefined,
      })) as any;
    }

    return clone;
  }
}
