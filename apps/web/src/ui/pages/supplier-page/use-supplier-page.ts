import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { Supplier } from '@purchase-history/core/entities'

import { suppliersService } from '@/api'
import type { SupplierDto } from '@purchase-history/core/dtos'
import { useToastMessage } from '@/ui/composables'

type Return = {
  supplier: Ref<Supplier | null>
  isSupplierLoading: Ref<boolean>
  handleSupplierFormSubmit: (SupplierDto: SupplierDto, supplierId: string) => void
  handleDeleteButtonClick: VoidFunction
}

export function useSupplierPage(closeDrawer: VoidFunction): Return {
  const route = useRoute()
  const toastMessage = useToastMessage()
  const supplier = ref<Supplier | null>(null)
  const isSupplierLoading = ref(true)

  async function handleSupplierFormSubmit(supplierDto: SupplierDto) {
    if (!supplier.value?.id) return

    const response = await suppliersService.updateSupplier(
      supplierDto,
      supplier.value?.id,
    )

    if (response.isFailure) {
      toastMessage.showError(response.errorMessage)
      return
    }

    if (response.isSuccess) {
      supplier.value = Supplier.create(response.body)
      closeDrawer()
    }
  }

  async function handleDeleteButtonClick() {
    if (!supplier.value?.id) return

    const response = await suppliersService.deleteSupplier(supplier.value.id)
    if (response.isSuccess) router.push('/suppliers')
  }

  onMounted(async () => {
    if (typeof route.params.supplierId !== 'string') return

    const response = await suppliersService.getSupplier(route.params.supplierId)
    if (response.isSuccess) {
      supplier.value = Supplier.create(response.body)
    }
    isSupplierLoading.value = false
  })

  return {
    supplier,
    isSupplierLoading,
    handleSupplierFormSubmit,
    handleDeleteButtonClick,
  }
}
