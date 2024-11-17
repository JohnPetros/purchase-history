<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

import Page from '@/ui/layouts/page-layout/index.vue'
import Container from '@/ui/components/container/index.vue'
import Button from '@/ui/components/button/index.vue'
import Code from '@/ui/components/code/index.vue'
import Info from '@/ui/components/info/index.vue'
import InvoiceStatus from '@/ui/components/invoice-status/index.vue'
import InvoiceSummary from '@/ui/pages/invoice-page/invoice-summary/index.vue'
import GoBackLink from '@/ui/components/go-back-link/index.vue'

import { useInvoicePage } from './use-invoice-page'

const { invoice, isInvoiceLoading, handleInvoiceStatusButtonClick } = useInvoicePage()
</script>

<template>
  <Page>
    <GoBackLink href="/invoices" />

    <Skeleton v-if="isInvoiceLoading" width="full" height="5.5rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="invoice" class-name="flex items-center justify-between mt-6 h-20 space-x-3">
      <div class="flex items-center gap-3" >
        <span class="text-slate-50">status</span>
        <InvoiceStatus :status="invoice.status" />
      </div>
      
      <Button @click="handleInvoiceStatusButtonClick">
        {{ invoice.status === 'pending' ? 'mark as paid' : 'mark as pending' }}
      </Button>
    </Container>

    <Skeleton v-if="isInvoiceLoading" width="full" height="12rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="invoice" class-name="mt-6">
      <Code>
        {{ invoice.number.value }}
        Invoice
      </Code>

      <dl class="mt-6 flex justify-between w-full">
        <Info label="Customer' info" >
          <span>{{ invoice.customer.name.value }}</span>
          <span>{{ invoice.customer.email.value }}</span>
        </Info>
        <Info label="Customer' address" >
          <span>{{ invoice.customer.address.city.value }}</span>
          <span>{{ invoice.customer.address.state.value }}</span>
          <span>{{ invoice.customer.address.zipcode.value }}</span>
        </Info>
        <Info label="Invoice date" >
          <span>{{ invoice.sentAt.format() }}</span>
        </Info>
      </dl>

      <div class="mt-10">
        <InvoiceSummary :amount="invoice.amount.format()" :items="invoice.items" />
      </div>
    </Container>
  </Page>
</template>