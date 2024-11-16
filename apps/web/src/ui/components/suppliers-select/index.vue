<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Select } from 'primevue'

import { Supplier } from '@purchase-history/core/entities'
import { suppliersService } from '@/api'

defineProps({
  id: String,
  label: String,
  name: String,
  defaultValue: String,
})

const suppliers = ref<Supplier[]>([])

onMounted(async () => {
  const response = await suppliersService.listSuppliers()
  if (response.isSuccess) suppliers.value = response.body.map(Supplier.create)
})
</script>

<template>
 <div>
    <label :for="id" class="block text-slate-50 mb-2">{{ label }}</label>
    <Select 
      :options="suppliers" 
      :name="name"
      optionLabel="name.value" 
      optionValue="id" 
      :defaultValue="defaultValue"
      placeholder="Select a supplier" 
      class="w-full h-[2.7rem] !bg-slate-700 !border-transparent !text-gray-100" 
      labelClass="!text-slate-50"
      overlayClass="!bg-slate-700"
    />
 </div>
</template>