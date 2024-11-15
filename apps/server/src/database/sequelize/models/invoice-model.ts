import { DataTypes } from 'sequelize'

import { sequelize } from '../client'
import { InvoiceItemModel } from './invoice-item-model'
import type { SequelizeInvoice } from '../types'
import { ProductModel } from './product-model'

export const InvoiceModel = sequelize.define<SequelizeInvoice>('invoices', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid'),
    allowNull: false,
  },
})

ProductModel.hasMany(InvoiceItemModel, {
  foreignKey: 'productId',
  constraints: true,
})

InvoiceItemModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  constraints: true,
  onDelete: 'CASCADE',
})

InvoiceModel.hasMany(InvoiceItemModel, {
  as: 'items',
  foreignKey: 'invoiceId',
  constraints: true,
})

InvoiceItemModel.belongsTo(InvoiceModel, {
  foreignKey: 'invoiceId',
  constraints: true,
})
