import type { InvoiceItemDto } from './invoice-item-dto'

export type InvoiceDto = {
  id?: string
  items: InvoiceItemDto[]
  sentAt: Date
}
