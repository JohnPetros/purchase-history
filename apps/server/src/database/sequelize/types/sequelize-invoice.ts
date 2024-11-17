import type { Model } from 'sequelize'
import type { SequelizeInvoiceItem } from './sequelize-invoice-item'
import type { SequelizeCustomer } from './sequelize-customer'

export interface SequelizeInvoice extends Model {
  id: string
  status: 'pending' | 'paid'
  items: SequelizeInvoiceItem[]
  number: number
  createdAt: Date
  customer: SequelizeCustomer
}
