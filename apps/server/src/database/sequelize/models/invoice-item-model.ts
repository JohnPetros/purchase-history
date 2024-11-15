import { DataTypes } from 'sequelize'
import { v4 as uuid } from 'uuid'

import { sequelize } from '../client'

export const InvoiceItemModel = sequelize.define('invoice-items', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: uuid(),
  },
  itemsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
