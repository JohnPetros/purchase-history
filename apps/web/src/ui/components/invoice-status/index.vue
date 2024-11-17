<script setup lang="ts">
import type { InvoiceStatus } from '@purchase-history/core/types'

type Props = {
  status: InvoiceStatus
}

defineProps<Props>()
</script>

<template>
  <div 
    v-if="status === 'paid'" 
    class="flex items-center justify-center gap-2 w-28 py-1 rounded-md bg-green-500 text-green-500 font-bold bg-opacity-10"
  >
    <span class="block animate-pulse size-2 bg-green-500 rounded-full"></span>
    Paid
  </div>
  <div 
    v-if="status === 'pending'"
   class="flex items-center justify-center gap-2 w-28 py-1 rounded-md bg-yellow-500 text-yellow-500 font-bold bg-opacity-10"
  >
  <span class="block animate-pulse size-2 bg-yellow-500 rounded-full"></span>
  Pending
  </div>
</template>