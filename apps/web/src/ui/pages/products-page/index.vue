<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import { Product } from '@purchase-history/core/entities'

import Page from '@/ui/layouts/page-layout/index.vue'
import PlusButton from '@/ui/components/plus-button/index.vue'
import ProductForm from '@/ui/components/product-form/index.vue'
import Drawer from '@/ui/components/drawer/index.vue'
import ProductCard from '@/ui/pages/products-page/product-card/index.vue'

import { productsService } from '@/api'
import type { ProductDto } from '@purchase-history/core/dtos'

const products = ref<Product[]>([])
const isProductsLoading = ref(true)
const drawerRef = useTemplateRef('drawer')

async function handleProductFormSubmit(productDto: ProductDto, supplierId: string) {
  const response = await productsService.registerProduct(productDto, supplierId)

  if (response.isSuccess) {
    products.value.unshift(Product.create(response.body))
    drawerRef.value?.close()
  }
}

onMounted(async () => {
  const response = await productsService.listProducts()

  if (response.isSuccess) {
    products.value = response.body.map(Product.create)
  }

  isProductsLoading.value = false
})
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
          <template v-slot:content>
           <ProductForm @submit="handleProductFormSubmit" />
          </template>
          <template v-slot:trigger>
            <PlusButton>
              new product
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
            :price="product.price.value" 
          />
        </li>
      </ul>
    </div>
  </Page>
</template>
