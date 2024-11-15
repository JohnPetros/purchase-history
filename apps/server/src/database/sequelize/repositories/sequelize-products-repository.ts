import { Product } from '@purchase-history/core/entities'
import type { IProductsRepository } from '@purchase-history/core/interfaces'

import type { SequelizeProduct } from '../types'
import { SupplierModel, type ProductModel } from '../models'

export class SequelizeProductsRepository implements IProductsRepository {
  constructor(private readonly productModel: typeof ProductModel) {}

  async findById(productId: string): Promise<Product | null> {
    const sequelizeProduct = await this.productModel.findByPk(productId)

    if (!sequelizeProduct) return null

    return this.createProduct(sequelizeProduct)
  }

  async findByCode(productCode: string): Promise<Product | null> {
    const sequelizeProduct = await this.productModel.findOne({
      where: { code: productCode },
      include: SupplierModel,
    })

    if (!sequelizeProduct) return null

    return this.createProduct(sequelizeProduct)
  }

  async findMany(): Promise<Product[]> {
    const sequelizeProducts = await this.productModel.findAll({
      include: SupplierModel,
    })

    return sequelizeProducts.map(this.createProduct)
  }

  async update(product: Product): Promise<void> {
    const productDto = product.dto
    await this.productModel.update(
      {
        name: productDto.name,
        code: productDto.code,
        description: productDto.description,
        price: productDto.price,
        supplierId: productDto.supplier?.id,
      },
      { where: { id: product.id } },
    )
  }

  async remove(productId: string): Promise<void> {
    await this.productModel.destroy({ where: { id: productId } })
  }

  async add(product: Product) {
    const productDto = product.dto
    await this.productModel.create({
      id: product.id,
      name: productDto.name,
      code: productDto.code,
      description: productDto.description,
      price: productDto.price,
      supplierId: productDto.supplier?.id,
    })
  }

  private createProduct(sequelizeProduct: SequelizeProduct): Product {
    return Product.create({
      id: sequelizeProduct.id,
      name: sequelizeProduct.name,
      code: sequelizeProduct.code,
      description: sequelizeProduct.description,
      price: Number(sequelizeProduct.price),
      supplier: sequelizeProduct.supplier,
    })
  }
}
