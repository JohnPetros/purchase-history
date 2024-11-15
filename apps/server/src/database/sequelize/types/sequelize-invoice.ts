import type { Model } from 'sequelize'
import type { SequelizeInvoiceItem } from './sequelize-invoice-item'

export interface SequelizeInvoice extends Model {
  id: string
  status: 'pending' | 'paid'
  items: SequelizeInvoiceItem[]
  createdAt: Date
}
