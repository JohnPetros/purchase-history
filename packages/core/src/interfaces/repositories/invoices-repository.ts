import type { Invoice } from '../../domain/entities/invoice'

export interface IInvoicesRepository {
  findById(invoiceId: string): Promise<Invoice | null>
  findMany(): Promise<Invoice[]>
  add(invoice: Invoice): Promise<void>
}
