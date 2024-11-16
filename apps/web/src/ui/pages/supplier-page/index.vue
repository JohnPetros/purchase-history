<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Skeleton } from 'primevue'

import Page from '@/ui/layouts/page-layout/index.vue'
import Container from '@/ui/components/container/index.vue'
import Info from '@/ui/components/info/index.vue'
import Button from '@/ui/components/button/index.vue'
import GoBackLink from '@/ui/components/go-back-link/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import SupplierForm from '@/ui/components/supplier-form/index.vue'
import ConfirmDialog from '@/ui/components/confirm-dialog/index.vue'

import { useSupplierPage } from './use-supplier-page'

const drawerRef = useTemplateRef('drawer')

const { supplier, isSupplierLoading, handleSupplierFormSubmit, handleDeleteButtonClick } =
  useSupplierPage(() => drawerRef.value?.close())
</script>

<template>
  <Page>
    <GoBackLink href="/suppliers" />

    <Skeleton v-if="isSupplierLoading" width="full" height="5.5rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="supplier" class-name="mt-6 space-x-3">
      <Drawer ref='drawer' title="Edit supplier">
        <template #content>
          <SupplierForm :supplier="supplier ?? undefined"  @submit="handleSupplierFormSubmit" /> 
        </template>
        <template #trigger>
          <Button>
            Edit
          </Button>
        </template>
      </Drawer>
      <ConfirmDialog @confirm="handleDeleteButtonClick">
        Delete
      </ConfirmDialog>
    </Container>

    <Skeleton v-if="isSupplierLoading" width="full" height="8rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="supplier" class-name="mt-6">
     <div class="flex items-center justify-between">
        <div>
          <h1 class="text-slate-50 text-xl">
            {{ supplier.name.value }}
          </h1>
        </div>
     </div>

      <dl class="grid grid-cols-3 mt-6">
        <Info label="E-mail" >
          {{ supplier.email.value }}
        </Info>
        <Info label="EIN" >
          {{ supplier.cnpj.value }}
        </Info>
        <Info label="Phone" >
          {{ supplier.phone.value }}
        </Info>
      </dl>
    </Container>
  </Page>
</template>