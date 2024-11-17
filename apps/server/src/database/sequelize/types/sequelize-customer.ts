import type { Model } from 'sequelize'

export interface SequelizeCustomer extends Model {
  id: string
  name: string
  email: string
  city: string
  state: string
  zipcode: string
}
