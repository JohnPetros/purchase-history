import type { Model } from 'sequelize'
import type { SequelizeProduct } from './sequelize-product'

export interface SequelizeInvoiceItem extends Model {
  id: string
  itemsCount: number
  product: SequelizeProduct
  createdAt: Date
}
