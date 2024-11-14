import { sequelize } from './sequelize/client'
import { ProductModel } from './sequelize/models'
import { SequelizeProductsRepository } from './sequelize/repositories'
;(async () => {
  await sequelize.sync({ force: true })
})()

export const productsRepository = new SequelizeProductsRepository(ProductModel)
