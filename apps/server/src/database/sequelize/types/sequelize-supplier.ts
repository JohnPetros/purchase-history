import type { Model } from 'sequelize'

export interface SequelizeSupplier extends Model {
  id: string
  name: string
  email: string
  ein: string
  phone: string
}
