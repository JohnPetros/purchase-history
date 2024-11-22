import type { FormSubmitEvent } from '@primevue/forms'

import type { Supplier } from '@purchase-history/core/entities'
import type { SupplierDto } from '@purchase-history/core/dtos'
import { ref, watch } from 'vue'

export function useSupplierForm(
  supplier: Supplier | undefined,
  onSubmit: (SupplierDto: Partial<SupplierDto>) => void,
) {
  const isSubmitting = ref(false)

  const initialValues = supplier
  ? {
      name: supplier.name.value,
      email: supplier.email.value,
      ein: supplier.ein.value,
      phone: supplier.phone.value,
    }
  : undefined

  function handleSubmit({ states }: FormSubmitEvent) {
    isSubmitting.value = true

    if (supplier) {
      const supplierDto: Partial<SupplierDto> = {}
      if (states.name.dirty) supplierDto.name = states.name.value
      if (states.email.dirty) supplierDto.email = states.email.value
      if (states.ein.dirty) supplierDto.ein = states.ein.value
      if (states.phone.dirty) supplierDto.phone = states.phone.value
      onSubmit(supplierDto)
      return
    }

    const supplierDto: SupplierDto = {
      name: states.name.value,
      email: states.email.value,
      ein: states.ein.value,
      phone: states.phone.value,
    }
    onSubmit(supplierDto)
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
