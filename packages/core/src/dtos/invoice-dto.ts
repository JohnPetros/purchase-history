import type { InvoiceStatus } from '../types'
import type { InvoiceItemDto } from './invoice-item-dto'

export type InvoiceDto = {
  id?: string
  status?: InvoiceStatus
  items?: InvoiceItemDto[]
  sentAt?: Date
}
