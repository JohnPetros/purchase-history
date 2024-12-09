<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import Page from '@/ui/layouts/page-layout/index.vue'
import PlusButton from '@/ui/components/plus-button/index.vue'
import ProductForm from '@/ui/components/product-form/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import ProductCard from '@/ui/pages/products-page/product-card/index.vue'
import Pagination from '@/ui/components/pagination/index.vue'

import { useProductsPage } from './use-products-page'

const drawerRef = useTemplateRef('drawer')
const { products, isProductsLoading, handleProductFormSubmit } =
  useProductsPage(drawerRef)
</script>

<template>
  <Page>
    <div>
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl text-slate-50 font-semibold">Products</h1>
          <p v-show="!isProductsLoading" class="text-slate-50 text-sm mt-3">There are {{ products.length }} total products</p>
        </div>
       <Drawer ref="drawer" title="New product">
          <template #content>
           <ProductForm @submit="handleProductFormSubmit" />
          </template>
          <template #trigger>
            <PlusButton>
              New product
            </PlusButton>
          </template>
       </Drawer>
      </header>

      <div v-if="isProductsLoading" class="mt-12 mx-auto w-max">
        <ProgressSpinner aria-label="Loading" />
      </div>

      <ul v-if="!isProductsLoading" class="mt-12 space-y-6">
        <li v-for="product in products">
          <ProductCard 
            :id="product.id" 
            :code="product.code.value" 
            :name="product.name.value" 
            :price="product.price.format()" 
          />
        </li>
      </ul>
    </div>

    <Pagination :total-records-count="100" />
  </Page>
</template>
