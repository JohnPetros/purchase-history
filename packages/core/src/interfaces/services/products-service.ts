import type { ProductDto } from '@purchase-history/core/dtos'
import type { ApiResponse } from '@purchase-history/core/responses'

export interface IProductsService {
  listProducts(): Promise<ApiResponse<ProductDto[]>>
  registerProduct(
    productDto: ProductDto,
    supplierId: string,
  ): Promise<ApiResponse<ProductDto>>
}
