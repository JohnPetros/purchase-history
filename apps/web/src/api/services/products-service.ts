import type { ProductDto } from '@purchase-history/core/dtos'
import type { IApiClient, IProductsService } from '@purchase-history/core/interfaces'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async getProduct(productId) {
      return await apiClient.get<ProductDto>(`/products/${productId}`)
    },

    async listProducts() {
      return await apiClient.get<ProductDto[]>('/products')
    },

    async registerProduct(productDto, supplierId) {
      return await apiClient.post<ProductDto>('/products', {
        product: productDto,
        supplierId,
      })
    },

    async updateProduct(productDto, supplierId, productId) {
      return await apiClient.put<ProductDto>(`/products/${productId}`, {
        product: productDto,
        supplierId,
      })
    },

    async deleteProduct(productId) {
      return await apiClient.delete(`/products/${productId}`)
    },
  }
}
