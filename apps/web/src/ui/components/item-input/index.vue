<script setup lang="ts">
import Input from '@/ui/components/input/index.vue'
import { useItemInput } from './use-item-input'

type Props = {
  id: string
  name: string
  price: number
}

const { id, price } = defineProps<Props>()
const emit = defineEmits(['delete', 'change'])

const { itemPrice, amount, handleItemsCountChange } = useItemInput(price, (itemsCount) =>
  emit('change', id, itemsCount),
)
</script>


<template>
  <div class="flex items-center gap-3">
    <Input type="text" label="Name" :default="name" readonly />
    <Input type="number" label="Qty." min="1" default="1" @change="handleItemsCountChange" />
    <Input type="text" label="Price" :default="itemPrice" readonly />
    <Input type="text" label="Amount" :default="amount" readonly />
    <button type="button" class="group grid place-content-center p-2 mt-8" @click="emit('delete', id)">
      <i class="pi pi-trash font-bold text-slate-500 group-hover:text-red-500"></i>
    </button>
  </div>
</template>