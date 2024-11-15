<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'

import Input from '@/ui/components/input/index.vue'
import Textarea from '@/ui/components/textarea/index.vue'
import Button from '@/ui/components/button/index.vue'
import SuppliersSelect from '@/ui/components/suppliers-select/index.vue'

const emit = defineEmits(['submit'])

function handleSubmit({ states, reset }: FormSubmitEvent) {
  const productDto = {
    name: states.name.value,
    description: states.description.value,
    code: states.code.value,
    price: Number(states.price.value),
  }
  emit('submit', productDto, states.supplierId.value)
  reset()
}
</script>

<template>
  <Form v-slot="$form" @submit="handleSubmit" class="space-y-3">
    <div class="grid grid-cols-2 gap-3">
      <Input id="name" label="Name" name="name" type="text" placeholder="Simplex" />
      <Input id="name" label="Code" name="code" type="text" placeholder="xgkivm" />
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Input id="price" label="Price" name="price" type="text" placeholder="50.00" />
      <SuppliersSelect id="supplierId" name="supplierId" label="Supplier" />
    </div>
    <div class="mt-3">
      <Textarea id="description" label="Description" name="description" placeholder="Simplex" />
    </div>
    <Button type="submit">
      Register
    </Button>
  </Form>
</template>