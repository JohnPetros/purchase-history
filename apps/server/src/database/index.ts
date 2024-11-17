import { sequelize } from './sequelize/client'
import { SupplierModel, ProductModel, InvoiceModel } from './sequelize/models'
import { CustomerModel } from './sequelize/models/customer-model'
import { InvoiceItemModel } from './sequelize/models/invoice-item-model'
import {
  SequelizeInvoicesRepository,
  SequelizeProductsRepository,
  SequelizeSuppliersRepository,
} from './sequelize/repositories'
;(async () => {
  await sequelize.sync()
})()

export const productsRepository = new SequelizeProductsRepository(ProductModel)
export const suppliersRepository = new SequelizeSuppliersRepository(SupplierModel)
export const invoicesRepository = new SequelizeInvoicesRepository(
  InvoiceModel,
  InvoiceItemModel,
  CustomerModel,
)
