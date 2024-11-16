<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Skeleton } from 'primevue'

import Page from '@/ui/layouts/page-layout/index.vue'
import Container from '@/ui/components/container/index.vue'
import Code from '@/ui/components/code/index.vue'
import Info from '@/ui/components/info/index.vue'
import Button from '@/ui/components/button/index.vue'
import GoBackLink from '@/ui/components/go-back-link/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import ProductForm from '@/ui/components/product-form/index.vue'
import ConfirmDialog from '@/ui/components/confirm-dialog/index.vue'

import { useProductPage } from './use-product-page'

const drawerRef = useTemplateRef('drawer')

const { product, isProductLoading, handleProductFormSubmit, handleDeleteButtonClick } =
  useProductPage(() => drawerRef.value?.close())
</script>

<template>
  <Page>
    <GoBackLink href="/" />

    <Skeleton v-if="isProductLoading" width="full" height="5.5rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="product" class-name="mt-6 space-x-3">
      <Drawer ref='drawer' title="Edit product">
        <template #content>
          <ProductForm :product="product ?? undefined"  @submit="handleProductFormSubmit" /> 
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

    <Skeleton v-if="isProductLoading" width="full" height="12rem" class="!bg-slate-800 !mt-6"></Skeleton>

    <Container v-if="product" class-name="mt-6">
     <div class="flex items-center justify-between">
        <div>
          <Code>
            {{ product.code.value }}
          </Code>
          <h1 class="text-slate-50 text-xl">
            {{ product.name.value }}
          </h1>
        </div>

        <strong class="text-slate-50 font-bold text-2xl">{{ product.price.format() }}</strong>
     </div>

      <dl class="mt-6">
        <Info label="Fornecedor" >
          <span>{{ product.supplier?.name.value }}</span>
          <span>{{ product.supplier?.email.value }}</span>
        </Info>
      </dl>
    </Container>
  </Page>
</template>