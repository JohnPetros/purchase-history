<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import Page from '@/ui/layouts/page-layout/index.vue'
import PlusButton from '@/ui/components/plus-button/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import { useSuppliersPage } from './use-suppliers-page'
import SupplierForm from '@/ui/components/supplier-form/index.vue'
import SupplierCard from '@/ui/pages/suppliers-page/supplier-card/index.vue'

const drawerRef = useTemplateRef('drawer')
const { suppliers, isSuppliersLoading, handleSupplierFormSubmit } =
  useSuppliersPage(drawerRef)
</script>

<template>
  <Page>
    <div>
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl text-slate-50 font-semibold">Suppliers</h1>
          <p v-show="!isSuppliersLoading" class="text-slate-50 text-sm mt-3">There are {{ suppliers.length }} total Suppliers</p>
        </div>
       <Drawer ref="drawer" title="New Supplier">
          <template #content>
           <SupplierForm @submit="handleSupplierFormSubmit" />
          </template>
          <template #trigger>
            <PlusButton>
              New Supplier
            </PlusButton>
          </template>
       </Drawer>
      </header>

      <div v-if="isSuppliersLoading" class="mt-12 mx-auto w-max">
        <ProgressSpinner aria-label="Loading" />
      </div>

      <ul v-if="!isSuppliersLoading" class="mt-12 space-y-6">
        <li v-for="supplier in suppliers">
          <SupplierCard 
            :id="supplier.id" 
            :name="supplier.name.value" 
            :email="supplier.email.value" 
          />
        </li>
      </ul>
    </div>
  </Page>
</template>
