import type { FormSubmitEvent } from '@primevue/forms'

import type { Product } from '@purchase-history/core/entities'
import type { ProductDto } from '@purchase-history/core/dtos'
import { ref, watch } from 'vue'

export function useProductForm(
  product: Product | undefined,
  onSubmit: (productDto: Partial<ProductDto>, supplierId: string) => void,
) {
  const isSubmitting = ref(false)

  const initialValues = product
    ? {
        name: product.name.value,
        code: product.code.value,
        price: product.price.value,
        description: product.description.value,
        supplierId: product.supplier?.id,
      }
    : undefined

  function handleSubmit({ states }: FormSubmitEvent) {
    isSubmitting.value = true

    if (product) {
      const productDto: Partial<ProductDto> = {}
      if (states.name.dirty) productDto.name = states.name.value
      if (states.description.dirty) productDto.description = states.description.value
      if (states.code.dirty) productDto.code = states.code.value
      if (states.price.dirty) productDto.price = Number(states.price.value)
      onSubmit(productDto, states.supplierId.value)
      return
    }

    const productDto: ProductDto = {
      name: states.name.value,
      description: states.description.value,
      code: states.code.value,
      price: Number(states.price.value),
    }
    onSubmit(productDto, states.supplierId.value)
  }

  watch(isSubmitting, () => {
    if (isSubmitting.value)
      setTimeout(() => {
        isSubmitting.value = false
      }, 2000)
  })

  return {
    initialValues,
    isSubmitting,
    handleSubmit,
  }
}
