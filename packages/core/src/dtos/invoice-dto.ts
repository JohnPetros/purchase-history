import type { InvoiceStatus } from '../types'
import type { InvoiceItemDto } from './invoice-item-dto'

export type InvoiceDto = {
  id?: string
  items: InvoiceItemDto[]
  invoiceStatus: InvoiceStatus
  sentAt: Date
}
