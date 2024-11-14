import type { ProductDto } from './product-dto'

export type InvoiceItemDto = {
  product: ProductDto
  itemsCount: number
}
