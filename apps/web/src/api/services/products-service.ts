import type { ProductDto } from '@purchase-history/core/dtos'
import type { IApiClient, IProductsService } from '@purchase-history/core/interfaces'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async listProducts() {
      return await apiClient.get<ProductDto[]>('/products')
    },

    async registerProduct(productDto, supplierId) {
      return await apiClient.post<ProductDto>('/products', {
        product: productDto,
        supplierId,
      })
    },
  }
}
