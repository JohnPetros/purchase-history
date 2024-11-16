import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { Product } from '@purchase-history/core/entities'

import { productsService } from '@/api'
import type { ProductDto } from '@purchase-history/core/dtos'

type Return = {
  product: Ref<Product | null>
  handleProductFormSubmit: (productDto: ProductDto, supplierId: string) => void
  handleDeleteButtonClick: VoidFunction
}

export function useProductPage(closeDrawer: VoidFunction): Return {
  const route = useRoute()

  const product = ref<Product | null>(null)

  async function handleProductFormSubmit(productDto: ProductDto, supplierId: string) {
    if (!product.value?.id) return

    const response = await productsService.updateProduct(
      productDto,
      supplierId,
      product.value?.id,
    )

    console.log(response.isSuccess)

    if (response.isSuccess) {
      product.value = Product.create(response.body)
      closeDrawer()
    }
  }

  async function handleDeleteButtonClick() {
    if (!product.value?.id) return

    const response = await productsService.deleteProduct(product.value.id)
    if (response.isSuccess) router.push('/')
  }

  onMounted(async () => {
    if (typeof route.params.productId !== 'string') return

    const response = await productsService.getProduct(route.params.productId)
    if (response.isSuccess) {
      product.value = Product.create(response.body)
    }
  })

  return {
    product,
    handleProductFormSubmit,
    handleDeleteButtonClick,
  }
}
