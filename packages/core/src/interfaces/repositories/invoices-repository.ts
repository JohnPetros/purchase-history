import type { Invoice } from '../../domain/entities/invoice'
import type { InvoiceStatus } from '../../types'

export interface IInvoicesRepository {
  findById(invoiceId: string): Promise<Invoice | null>
  findMany(): Promise<Invoice[]>
  add(invoice: Invoice): Promise<void>
  updateStatus(invoiceStatus: InvoiceStatus, invoiceId: string): Promise<void>
}
