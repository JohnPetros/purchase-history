import { DataTypes } from 'sequelize'
import { v4 as uuid } from 'uuid'

import { sequelize } from '../client'
import type { SequelizeCustomer } from '../types'

export const CustomerModel = sequelize.define<SequelizeCustomer>('customer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: uuid(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
