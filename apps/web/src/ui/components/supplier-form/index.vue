<script setup lang="ts">
import { Form } from '@primevue/forms'

import type { Supplier } from '@purchase-history/core/entities'

import Input from '@/ui/components/input/index.vue'
import Button from '@/ui/components/button/index.vue'
import { useSupplierForm } from './use-supplier-form'

type Props = {
  supplier?: Supplier
}

const { supplier } = defineProps<Props>()
const emit = defineEmits(['submit'])

const { initialValues, isSubmitting, handleSubmit } = useSupplierForm(
  supplier,
  (supplierDto) => emit('submit', supplierDto),
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
        placeholder="Jane Smith" 
      />
      <Input 
        id="name" 
        label="Email" 
        name="email" 
        type="email" 
        placeholder="jasons@domain.com" 
      />
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Input 
        id="cnpj" 
        label="EIN" 
        name="cnpj" 
        type="text" 
        placeholder="12-3456789"
      />
      <Input 
        id="phone" 
        label="Phone" 
        name="phone" 
        type="text" 
        placeholder="(61) 3303-4671"
      />
    </div>
    <Button type="submit" :loading="isSubmitting">
      Confirm
    </Button>
  </Form>
</template>