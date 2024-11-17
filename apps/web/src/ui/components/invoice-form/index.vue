<script setup lang="ts">
import { Form } from '@primevue/forms'
import AddItemButton from 'primevue/button'
import Dialog from 'primevue/dialog'

import Input from '@/ui/components/input/index.vue'
import Button from '@/ui/components/button/index.vue'
import ItemInput from '@/ui/components/item-input/index.vue'
import type { Invoice } from '@purchase-history/core/entities'
import { useInvoiceForm } from './use-invoice-form'
import { MultiSelect } from 'primevue'
import { ref } from 'vue'

type Props = {
  invoice?: Invoice
}

const emit = defineEmits(['submit'])

const { invoice } = defineProps<Props>()

const {
  initialValues,
  products,
  selectedItemsIds,
  isSubmitting,
  isDialogVisible,
  handleSubmit,
  handleSelectItems,
  handleItemCountChange,
  handleDeleteItemButtonClick,
} = useInvoiceForm(invoice, (invoiceDto, itemsIds, itemsCounts) =>
  emit('submit', invoiceDto, itemsIds, itemsCounts),
)
</script>

<template>
  <Form @submit="handleSubmit" :initial-values="initialValues" class="space-y-3">
    <div class="grid grid-cols-2 gap-3">
      <Input 
        id="customerName" 
        label="Name" 
        name="customerName" 
        type="text" 
        placeholder="John Smith" 
      />
      <Input 
        id="customerEmail" 
        label="Email" 
        name="customerEmail" 
        type="text" 
        placeholder="john@gmail.com" 
      />
    </div>
    <div class="grid grid-cols-3 gap-3">
      <Input 
        id="customer-state" 
        label="State" 
        name="customerState" 
        type="text" 
        placeholder="Louisville"
      />
      <Input 
        id="customer-city" 
        label="City" 
        name="customerCity" 
        type="text" 
        placeholder="Kentucky"
      />
      <Input 
        id="customerZipcode" 
        label="Zipcode" 
        name="customerZipcode" 
        type="text" 
        placeholder="40202"
      />
    </div>
    <div class="mt-3">
      <div v-for="product in products" class="space-y-3">
        <ItemInput 
          v-if="selectedItemsIds.includes(product.id)" 
          :key="product.id" 
          :id="product.id" 
          :name="product.name.value" 
          :price="product.price.value" 
          @change="handleItemCountChange"
          @delete="handleDeleteItemButtonClick"
        />
      </div>
      <Dialog v-model:visible="isDialogVisible" header="Products" class="!bg-slate-800 !text-slate-50">
       <div class="flex flex-col gap-3">
          <MultiSelect 
            v-model="selectedItemsIds" 
            :options="products" 
            optionLabel="name.value" 
            optionValue="id" 
            filter 
            placeholder="Select Products"
            :maxSelectedLabels="3" 
            class="w-full md:w-80" 
          />
          <Button type="submit" @click="handleSelectItems">
            Confirm
          </Button>
       </div>
      </Dialog>
      <AddItemButton 
        type="button" 
        class="!rounded-md !bg-slate-700 !w-full !border-none !mt-6" 
        icon="pi pi-plus"
        @click="isDialogVisible = true">
        Add item
      </AddItemButton>
    </div>
    <Button type="submit" :loading="isSubmitting" loading-icon="pi pi-search">
      Confirm
    </Button>
  </Form>
</template>