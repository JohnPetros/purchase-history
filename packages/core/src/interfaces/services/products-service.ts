import type { ProductDto } from '@purchase-history/core/dtos'
import type { ApiResponse } from '@purchase-history/core/responses'

export interface IProductsService {
  getProduct(productId: string): Promise<ApiResponse<ProductDto>>
  listProducts(): Promise<ApiResponse<ProductDto[]>>
  registerProduct(
    productDto: ProductDto,
    supplierId: string,
  ): Promise<ApiResponse<ProductDto>>
  updateProduct(
    productDto: Partial<ProductDto>,
    supplierId: string,
    productId: string,
  ): Promise<ApiResponse<ProductDto>>
  deleteProduct(productId: string): Promise<ApiResponse>
}
