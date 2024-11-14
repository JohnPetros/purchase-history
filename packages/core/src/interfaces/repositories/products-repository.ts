import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findById(productId: string): Promise<Product>
  findByCode(productCode: string): Promise<Product>
  findMany(products: Product): Promise<void>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  delete(productId: string): Promise<void>
}
