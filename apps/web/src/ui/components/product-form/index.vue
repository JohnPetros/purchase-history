<script setup lang="ts">
import { Form } from '@primevue/forms'

import Input from '@/ui/components/input/index.vue'
import Textarea from '@/ui/components/textarea/index.vue'
import Button from '@/ui/components/button/index.vue'
import SuppliersSelect from '@/ui/components/suppliers-select/index.vue'
import type { Product } from '@purchase-history/core/entities'
import { useProductForm } from './use-product-form'

type Props = {
  product?: Product
}

const emit = defineEmits(['submit'])

const { product } = defineProps<Props>()

const { initialValues, isSubmitting, handleSubmit } = useProductForm(
  product,
  (productDto, supplierId) => emit('submit', productDto, supplierId),
)
</script>

<template>
  <Form @submit="handleSubmit" :initial-values="initialValues" class="space-y-3">
    <div class="grid grid-cols-2 gap-3">
      <Input 
        id="name" 
        label="Name" 
        name="name" 
        type="text" 
        placeholder="Simplex" 
      />
      <Input 
        id="name" 
        label="Code" 
        name="code" 
        type="text" 
        placeholder="xgkivm" 
      />
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Input 
        id="price" 
        label="Price" 
        name="price" 
        type="number" 
        placeholder="50.00"
      />
      <SuppliersSelect
        id="supplierId" 
        name="supplierId" 
        label="Supplier" 
        :default-value="product?.supplier?.id"
      />
    </div>
    <div class="mt-3">
      <Textarea 
        id="description" 
        label="Description" 
        name="description" 
        placeholder="Simplex"
      />
    </div>
    <Button type="submit" :loading="isSubmitting" loading-icon="pi pi-search">
      Confirm
    </Button>
  </Form>
</template>