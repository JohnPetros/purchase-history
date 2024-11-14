import type { Product } from '../../domain/entities'

export interface IProductsRopository {
  findById(productId: string): Promise<void>
  findMany(products: Product): Promise<void>
  add(product: Product): Promise<void>
  update(product: Product, productId: string): Promise<void>
  delete(productId: string): Promise<void>
}
