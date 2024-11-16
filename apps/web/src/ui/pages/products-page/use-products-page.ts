import { onMounted, ref, type Ref } from 'vue'

import type { ProductDto } from '@purchase-history/core/dtos'
import { Product } from '@purchase-history/core/entities'

import { productsService } from '@/api'

type Return = {
  products: Ref<Product[]>
  isProductsLoading: Ref<boolean>
  handleProductFormSubmit: (productDto: ProductDto, supplierId: string) => void
}

export function useProductsPage(drawerRef: Ref): Return {
  const products = ref<Product[]>([])
  const isProductsLoading = ref(true)

  async function handleProductFormSubmit(productDto: ProductDto, supplierId: string) {
    const response = await productsService.registerProduct(productDto, supplierId)

    if (response.isSuccess) {
      products.value.unshift(Product.create(response.body))
      drawerRef.value?.close()
    }
  }

  onMounted(async () => {
    const response = await productsService.listProducts()

    if (response.isSuccess) {
      products.value = response.body.map(Product.create)
    }

    isProductsLoading.value = false
  })

  return {
    products,
    isProductsLoading,
    handleProductFormSubmit,
  }
}
