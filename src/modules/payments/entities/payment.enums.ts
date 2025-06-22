// src/modules/payments/entities/payment.enums.ts
export enum PaymentMethod {
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  OTHER = 'OTHER',
}

export enum PaymentKind {
  RESIDENT_FEE = 'RESIDENT_FEE', // cuotas, mantenimiento
  PROVIDER = 'PROVIDER', // pagos a proveedores
  PAYROLL = 'PAYROLL', // nómina
  TAX = 'TAX', // impuestos
  EXTRAORDINARY = 'EXTRAORDINARY', // eventos, imprevistos
  AMENITY = 'AMENITY', // reservas de amenidades
  OTHER = 'OTHER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
