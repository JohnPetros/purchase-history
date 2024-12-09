<script setup lang="ts">
import type { InvoiceStatus as Status } from '@purchase-history/core/types'

import Code from '@/ui/components/code/index.vue'
import Card from '@/ui/components/card/index.vue'
import InvoiceStatus from '@/ui/components/invoice-status/index.vue'

type Props = {
  id: string
  number: number
  amount: string
  customerName: string
  sentAt: string
  status: Status
}

defineProps<Props>()
</script>

<template>
 <div class="md:hidden">
    <Card :link="`/invoices/${id}`" class="" >
    <div class="space-y-3">
      <Code>
        {{  number }}
      </Code>
      <h2 class="text-slate-50 truncate w-24">{{ customerName }}</h2>
      <time class="text-slate-50">{{ sentAt }}</time>
    </div>
    <div class="space-y-3">
      <strong class="text-slate-50 text-lg font-bold">{{ amount }}</strong>
      <InvoiceStatus :status="status" />
    </div>
    </Card>
 </div>

 <div class="hidden md:block">
  <Card :link="`/invoices/${id}`">
    <Code>
      {{  number }}
    </Code>
    <h2 class="text-slate-50 truncate w-24">{{ customerName }}</h2>
    <time class="text-slate-50">{{ sentAt }}</time>
    <strong class="text-slate-50 text-lg font-bold">{{ amount }}</strong>
    <InvoiceStatus :status="status" />
  </Card>
 </div>
</template>