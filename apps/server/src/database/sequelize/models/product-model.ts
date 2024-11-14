import { DataTypes } from 'sequelize'
import { sequelize } from '../client'
import type { SequelizeProduct } from '../types'
import { SupplierModel } from './supplier-model'

export const ProductModel = sequelize.define<SequelizeProduct>('products', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
})

ProductModel.belongsTo(SupplierModel, { constraints: true, foreignKey: 'supplierId' })
