import { sequelize } from './sequelize/client'
import { ProductModel, SupplierModel } from './sequelize/models'
import {
  SequelizeProductsRepository,
  SequelizeSuppliersRepository,
} from './sequelize/repositories'
;(async () => {
  await sequelize.sync()
})()

export const productsRepository = new SequelizeProductsRepository(ProductModel)
export const suppliersRepository = new SequelizeSuppliersRepository(SupplierModel)
