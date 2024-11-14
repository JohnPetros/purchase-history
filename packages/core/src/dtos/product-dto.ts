import type { SupplierDto } from './supplier-dto'

export type ProductDto = {
  id?: string
  name: string
  description: string
  code: string
  price: number
  supplier: SupplierDto
}
