import { DataTypes } from 'sequelize'
import { sequelize } from '../client'
import type { SequelizeProduct } from '../types'

export const SupplierModel = sequelize.define<SequelizeProduct>('suppliers', {
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
