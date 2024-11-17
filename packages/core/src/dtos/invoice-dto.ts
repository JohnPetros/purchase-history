import type { InvoiceStatus } from '../types'
import type { InvoiceItemDto } from './invoice-item-dto'

export type InvoiceDto = {
  id?: string
  number?: number
  status?: InvoiceStatus
  items?: InvoiceItemDto[]
  sentAt?: Date
  customer: {
    name: string
    email: string
    address: {
      city: string
      state: string
      zipcode: string
    }
  }
}
