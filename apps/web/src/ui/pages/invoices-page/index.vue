<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import Page from '@/ui/layouts/page-layout/index.vue'
import PlusButton from '@/ui/components/plus-button/index.vue'
import InvoiceForm from '@/ui/components/invoice-form/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import Pagination from '@/ui/components/pagination/index.vue'
import InvoiceCard from '@/ui/pages/invoices-page/invoice-card/index.vue'

import { useInvoicesPage } from './use-invoices-page'
import { Select } from 'primevue'

const drawerRef = useTemplateRef('drawer')
const {
  invoices,
  products,
  pagesCount,
  totalInvoicesCount,
  selectedStatus,
  selectedProductId,
  isInvoicesLoading,
  handleInvoiceFormSubmit,
  handlePaginationChange,
} = useInvoicesPage(drawerRef)
</script>

<template>
  <Page>
    <div>
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl text-slate-50 font-semibold">Invoices</h1>
          <p v-show="!isInvoicesLoading" class="text-slate-50 text-sm mt-3">There are {{ invoices.length }} total Invoices</p>
        </div>

        <Drawer ref="drawer" title="New Invoice">
            <template #content>
            <InvoiceForm @submit="handleInvoiceFormSubmit" />
            </template>
            <template #trigger>
              <PlusButton>
                New Invoice
              </PlusButton>
            </template>
        </Drawer>
      </header>

     <div class="flex items-center gap-3 mt-3">
      <Select 
        v-model="selectedProductId" 
        :options="products" 
        optionLabel="name.value" 
        optionValue="id" 
        filter 
        placeholder="Filter by product" 
      />
      <Select 
       v-model="selectedStatus" 
       :options="['all', 'paid', 'pending']" 
       placeholder="Filter by status" 
      />
     </div>

      <div v-if="isInvoicesLoading" class="mt-12 mx-auto w-max">
        <ProgressSpinner aria-label="Loading" />
      </div>

      <ul v-if="!isInvoicesLoading" class="mt-12 space-y-6">
        <li 
          v-for="invoice in invoices"
          :key="invoice.id"
        >
          <InvoiceCard
            :id="invoice.id" 
            :number="invoice.number.value" 
            :amount="invoice.amount.format()" 
            :sent-at="invoice.sentAt.format()"
            :status="invoice.status"
            :customer-name="invoice.customer.name.value" 
          />
        </li>
      </ul>
    </div>

    <div v-if="pagesCount > 1" class="mt-6">
      <Pagination :total-records-count="totalInvoicesCount" :change="handlePaginationChange" />
    </div>
  </Page>
</template>
