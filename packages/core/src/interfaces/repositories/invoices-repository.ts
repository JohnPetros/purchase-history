import type { Invoice } from '../../domain/entities/invoice'

export interface IInvoincesRepository {
  findId(invoiceId: string): Promise<Invoice>
  findMany(): Promise<Invoice[]>
  add(invoice: Invoice): Promise<void>
}
