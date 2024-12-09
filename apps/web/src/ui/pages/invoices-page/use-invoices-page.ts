import { onMounted, ref, watch, type Ref } from 'vue'

import type { InvoiceDto } from '@purchase-history/core/dtos'
import { Invoice, Product } from '@purchase-history/core/entities'

import { useToastMessage } from '@/ui/composables'

import { invoicesService, productsService } from '@/api'

type Return = {
  invoices: Ref<Invoice[]>
  products: Ref<Product[]>
  isInvoicesLoading: Ref<boolean>
  page: Ref<number>
  pagesCount: Ref<number>
  totalInvoicesCount: Ref<number>
  selectedStatus: Ref<string>
  selectedProductId: Ref<string>
  handleInvoiceFormSubmit: (
    InvoiceDto: InvoiceDto,
    itemsIds: string[],
    itemsCounts: number[],
  ) => void
  handlePaginationChange: (newPage: number) => void
}

export function useInvoicesPage(drawerRef: Ref): Return {
  const toastMessage = useToastMessage()
  const totalInvoicesCount = ref(0)
  const pagesCount = ref(0)
  const invoices = ref<Invoice[]>([])
  const products = ref<Product[]>([])
  const selectedProductId = ref('')
  const selectedStatus = ref('')
  const isInvoicesLoading = ref(true)
  const page = ref(1)

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

  async function handlePaginationChange(newPage: number) {
    const response = await invoicesService.listInvoices({
      productId: selectedProductId.value,
      status: selectedStatus.value,
      page: newPage,
    })
    page.value = newPage

    if (response.isSuccess) {
      invoices.value = response.body.items.map(Invoice.create)
      totalInvoicesCount.value = response.body.itemsCount
      pagesCount.value = response.body.pagesCount
    }
  }

  async function handleFiltersChange() {
    const response = await invoicesService.listInvoices({
      productId: selectedProductId.value,
      status: selectedStatus.value,
      page: page.value,
    })

    if (response.isSuccess) {
      invoices.value = response.body.items.map(Invoice.create)
      totalInvoicesCount.value = response.body.itemsCount
      pagesCount.value = response.body.pagesCount
    }
  }

  watch(selectedProductId, handleFiltersChange)
  watch(selectedStatus, handleFiltersChange)

  onMounted(async () => {
    const invoicesResponse = await invoicesService.listInvoices({ page: page.value })

    if (invoicesResponse.isSuccess) {
      invoices.value = invoicesResponse.body.items.map(Invoice.create)
      totalInvoicesCount.value = invoicesResponse.body.itemsCount
      pagesCount.value = invoicesResponse.body.pagesCount
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
    page,
    pagesCount,
    totalInvoicesCount,
    selectedStatus,
    selectedProductId,
    isInvoicesLoading,
    handleInvoiceFormSubmit,
    handlePaginationChange,
  }
}
