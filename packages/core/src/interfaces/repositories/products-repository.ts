import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findById(productId: string): Promise<Product | null>
  findByCode(productCode: string): Promise<Product | null>
  findMany(): Promise<Product[]>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  remove(productId: string): Promise<void>
}
