import { onMounted, ref, type Ref } from 'vue'

import type { SupplierDto } from '@purchase-history/core/dtos'
import { Supplier } from '@purchase-history/core/entities'

import { suppliersService } from '@/api'
import { useToastMessage } from '@/ui/composables'

type Return = {
  suppliers: Ref<Supplier[]>
  isSuppliersLoading: Ref<boolean>
  handleSupplierFormSubmit: (supplierDto: SupplierDto) => void
}

export function useSuppliersPage(drawerRef: Ref): Return {
  const suppliers = ref<Supplier[]>([])
  const isSuppliersLoading = ref(true)
  const toast = useToastMessage()

  async function handleSupplierFormSubmit(supplierDto: SupplierDto) {
    const response = await suppliersService.registerSupplier(supplierDto)

    if (response.isFailure) {
      toast.showError(response.errorMessage)
    }

    if (response.isSuccess) {
      suppliers.value.unshift(Supplier.create(response.body))
      drawerRef.value?.close()
    }
  }

  onMounted(async () => {
    const response = await suppliersService.listSuppliers()

    if (response.isSuccess) {
      const fetchedSuppliers = response.body.map(Supplier.create)
      suppliers.value = fetchedSuppliers
    }

    isSuppliersLoading.value = false
  })

  return {
    suppliers,
    isSuppliersLoading,
    handleSupplierFormSubmit,
  }
}
