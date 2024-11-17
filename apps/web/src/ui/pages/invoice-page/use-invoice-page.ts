import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import { Invoice } from '@purchase-history/core/entities'

import { invoicesService } from '@/api'
import { useToastMessage } from '@/ui/composables'

type Return = {
  invoice: Ref<Invoice | null>
  isInvoiceLoading: Ref<boolean>
  handleInvoiceStatusButtonClick: VoidFunction
}

export function useInvoicePage(): Return {
  const route = useRoute()
  const toastMessage = useToastMessage()
  const invoice = ref<Invoice | null>(null)
  const isInvoiceLoading = ref(true)

  async function handleInvoiceStatusButtonClick() {
    if (!invoice.value) return

    invoice.value.toggleStatus()

    const response = await invoicesService.toggleInvoiceStatus(invoice.value?.id)

    if (response.isFailure) {
      toastMessage.showError(response.errorMessage)
      invoice.value.toggleStatus()
      return
    }
  }

  onMounted(async () => {
    if (typeof route.params.invoiceId !== 'string') return

    const response = await invoicesService.getInvoice(route.params.invoiceId)
    if (response.isSuccess) {
      invoice.value = Invoice.create(response.body)
      isInvoiceLoading.value = false
    }
  })

  return {
    invoice,
    isInvoiceLoading,
    handleInvoiceStatusButtonClick,
  }
}
