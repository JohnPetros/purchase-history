import { onMounted, ref, watch, type Ref } from 'vue'

import type { InvoiceDto } from '@purchase-history/core/dtos'
import { Invoice, Product } from '@purchase-history/core/entities'

import { useToastMessage } from '@/ui/composables'

import { invoicesService, productsService } from '@/api'
import type { InvoiceStatus } from '@purchase-history/core/types'

type Return = {
  invoices: Ref<Invoice[]>
  products: Ref<Product[]>
  isInvoicesLoading: Ref<boolean>
  selectedStatus: Ref<string>
  selectedProductId: Ref<string>
  handleInvoiceFormSubmit: (
    InvoiceDto: InvoiceDto,
    itemsIds: string[],
    itemsCounts: number[],
  ) => void
}

export function useInvoicesPage(drawerRef: Ref): Return {
  const toastMessage = useToastMessage()
  const invoices = ref<Invoice[]>([])
  const products = ref<Product[]>([])
  const selectedProductId = ref('')
  const selectedStatus = ref('')
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

  async function handleFiltersChange() {
    const response = await invoicesService.listInvoices({
      productId: selectedProductId.value,
      status: selectedStatus.value,
    })

    if (response.isSuccess) invoices.value = response.body.map(Invoice.create)
  }

  watch(selectedProductId, handleFiltersChange)
  watch(selectedStatus, handleFiltersChange)

  onMounted(async () => {
    const invoicesResponse = await invoicesService.listInvoices({})

    if (invoicesResponse.isSuccess) {
      invoices.value = invoicesResponse.body.map(Invoice.create)
    }

    isInvoicesLoading.value = false

    const productsResponse = await productsService.listProducts()
    if (productsResponse.isSuccess) {
      products.value = productsResponse.body.map(Product.create)
    }
  })

  return {
    invoices,
    products,
    selectedStatus,
    selectedProductId,
    isInvoicesLoading,
    handleInvoiceFormSubmit,
  }
}
