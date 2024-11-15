import { DataTypes } from 'sequelize'
import { sequelize } from '../client'
import type { SequelizeSupplier } from '../types'

export const SupplierModel = sequelize.define<SequelizeSupplier>('suppliers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
