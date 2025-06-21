// src/modules/payments/entities/payment.enums.ts
export enum PaymentMethod {
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  OTHER = 'OTHER',
}

export enum PaymentKind {
  RESIDENT_FEE = 'RESIDENT_FEE', // cobros de mantenimiento, cuotas, etc.
  PROVIDER = 'PROVIDER', // pagos a proveedores
  PAYROLL = 'PAYROLL', // nómina y honorarios
  TAX = 'TAX', // impuestos y contribuciones
  EXTRAORDINARY = 'EXTRAORDINARY', // gastos imprevistos / eventos
  OTHER = 'OTHER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
