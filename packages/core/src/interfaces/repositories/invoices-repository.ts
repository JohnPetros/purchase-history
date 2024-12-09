import type { Invoice } from '../../domain/entities/invoice'
import type { InvoicesListParams, InvoiceStatus } from '../../types'

export interface IInvoicesRepository {
  findById(invoiceId: string): Promise<Invoice | null>
  findMany(params: InvoicesListParams): Promise<{ invoices: Invoice[]; count: number }>
  add(invoice: Invoice): Promise<number>
  updateStatus(invoiceStatus: InvoiceStatus, invoiceId: string): Promise<void>
}
