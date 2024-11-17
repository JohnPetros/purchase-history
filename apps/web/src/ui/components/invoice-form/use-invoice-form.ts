import { onMounted, ref, watch, type Ref } from 'vue'
import type { FormSubmitEvent } from '@primevue/forms'

import { Product, type Invoice } from '@purchase-history/core/entities'
import type { InvoiceDto } from '@purchase-history/core/dtos'
import { productsService } from '@/api'

type SelectedItems = Record<string, number>

type Return = {
  initialValues: Record<string, string> | undefined
  isSubmitting: Ref<boolean>
  products: Ref<Product[]>
  selectedItemsIds: Ref<string[]>
  selectedItems: Ref<Record<string, number>>
  isDialogVisible: Ref<boolean>
  handleSubmit: (event: FormSubmitEvent) => void
  handleSelectItems: VoidFunction
  handleItemCountChange: (itemId: string, itemsCount: number) => void
  handleDeleteItemButtonClick: (itemId: string) => void
}

export function useInvoiceForm(
  invoice: Invoice | undefined,
  onSubmit: (
    invoiceDto: Partial<InvoiceDto>,
    itemsIds: string[],
    itemsCounts: number[],
  ) => void,
): Return {
  const isSubmitting = ref(false)
  const products = ref<Product[]>([])
  const isDialogVisible = ref(false)
  const selectedItemsIds = ref<string[]>([])
  const selectedItems = ref<Record<string, number>>({})

  const initialValues = invoice
    ? {
        customerName: invoice.customer.name.value,
        customerEmail: invoice.customer.email.value,
        customerState: invoice.customer.address.state.value,
        customerCity: invoice.customer.address.city.value,
        customerZipcode: invoice.customer.address.zipcode.value,
      }
    : undefined

  function handleSubmit({ states }: FormSubmitEvent) {
    isSubmitting.value = true

    const invoiceDto: InvoiceDto = {
      customer: {
        name: states.customerName.value,
        email: states.customerEmail.value,
        address: {
          city: states.customerCity.value,
          state: states.customerState.value,
          zipcode: states.customerZipcode.value,
        },
      },
    }
    onSubmit(
      invoiceDto,
      Object.keys(selectedItems.value),
      Object.values(selectedItems.value).map(Number),
    )
  }

  function handleSelectItems() {
    for (const itemId of selectedItemsIds.value) {
      selectedItems.value[itemId] = 1
    }

    isDialogVisible.value = false
  }

  function handleItemCountChange(itemId: string, itemsCount: number) {
    selectedItems.value[itemId] = itemsCount
  }

  function handleDeleteItemButtonClick(itemId: string) {
    selectedItemsIds.value = selectedItemsIds.value.filter(
      (selectedItem) => selectedItem !== itemId,
    )
    delete selectedItems.value[itemId]
  }

  watch(isSubmitting, () => {
    if (isSubmitting.value)
      setTimeout(() => {
        isSubmitting.value = false
      }, 2000)
  })

  onMounted(async () => {
    const response = await productsService.listProducts()
    if (response.isSuccess) {
      products.value = response.body.map(Product.create)
    }
  })

  return {
    initialValues,
    isSubmitting,
    isDialogVisible,
    products,
    selectedItemsIds,
    selectedItems,
    handleSubmit,
    handleSelectItems,
    handleItemCountChange,
    handleDeleteItemButtonClick,
  }
}
