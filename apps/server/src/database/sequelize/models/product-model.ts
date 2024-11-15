import { DataTypes } from 'sequelize'

import type { SequelizeProduct } from '../types'
import { sequelize } from '../client'
import { SupplierModel } from './supplier-model'
import { InvoiceItemModel } from './invoice-item-model'

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

ProductModel.belongsTo(SupplierModel, {
  constraints: true,
  foreignKey: 'supplierId',
  onDelete: 'CASCADE',
})
