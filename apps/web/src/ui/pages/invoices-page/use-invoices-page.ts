import { onMounted, ref, type Ref } from 'vue'

import type { InvoiceDto } from '@purchase-history/core/dtos'
import { Invoice } from '@purchase-history/core/entities'

import { invoicesService } from '@/api'
import { useToastMessage } from '@/ui/composables'

type Return = {
  invoices: Ref<Invoice[]>
  isInvoicesLoading: Ref<boolean>
  handleInvoiceFormSubmit: (
    InvoiceDto: InvoiceDto,
    itemsIds: string[],
    itemsCounts: number[],
  ) => void
}

export function useInvoicesPage(drawerRef: Ref): Return {
  const toastMessage = useToastMessage()
  const invoices = ref<Invoice[]>([])
  const isInvoicesLoading = ref(true)

  async function handleInvoiceFormSubmit(
    invoiceDto: InvoiceDto,
    itemsIds: string[],
    itemsCounts: number[],
  ) {
    const items = itemsIds.map((itemId, index) => ({
      productId: itemId,
      itemsCount: itemsCounts[index],
    }))

    const response = await invoicesService.sendInvoice(invoiceDto, items)

    if (response.isFailure) {
      toastMessage.showError(response.errorMessage)
      return
    }

    if (response.isSuccess) {
      invoices.value.unshift(Invoice.create(response.body))
      drawerRef.value?.close()
    }
  }

  onMounted(async () => {
    const response = await invoicesService.listInvoices()

    if (response.isSuccess) {
      invoices.value = response.body.map(Invoice.create)
    }

    isInvoicesLoading.value = false
  })

  return {
    invoices,
    isInvoicesLoading,
    handleInvoiceFormSubmit,
  }
}
