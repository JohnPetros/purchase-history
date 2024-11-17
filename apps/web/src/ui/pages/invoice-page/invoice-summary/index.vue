<script setup lang="ts">
import type { Product } from '@purchase-history/core/entities'
import { Price, type Integer } from '@purchase-history/core/structs'
import { computed } from 'vue'

type Item = {
  product: Product
  itemsCount: Integer
}

type Props = {
  items: Item[]
  amount: string
}

defineProps<Props>()
</script>

<template>
 <div class="text-slate-50 p-6 bg-slate-700 rounded-md">
    <div class="grid grid-cols-5">
      <h3 class="col-span-2 text-sm">Item name</h3>
      <h3 class="text-sm text-end">QTY.</h3>
      <h3 class="text-sm text-end">Price</h3>
      <h3 class="text-sm text-end">Total</h3>
    </div>
    <div v-for="item in items" class="grid grid-cols-5 mt-6">
        <strong class="col-span-2">{{ item.product.name.value }}</strong>
        <strong class="font-medium text-end" >{{ item.itemsCount.value }}</strong>
        <strong class="font-medium text-end" >{{ item.product.price.format() }}</strong>
        <strong class="font-medium text-end" >{{ item.product.price.multiply(item.itemsCount.value).format() }}</strong>
      </div>
    <div class="flex items-center justify-between bg-slate-950 mt-6 p-6 rounded-md">
      <h4 class="tracking-wider">Amount</h4>
      <strong class="text-slate-50 font-bold text-lg">{{ amount }}</strong>
    </div>
 </div>
</template>