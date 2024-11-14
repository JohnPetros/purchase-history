import type { Model } from 'sequelize'
import type { SequelizeSupplier } from './sequelize-supplier'

export interface SequelizeProduct extends Model {
  id: string
  name: string
  code: string
  description: string
  price: number
  supplier: SequelizeSupplier
}
