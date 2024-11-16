import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../ui/pages/products-page/index.vue'
import ProductPage from '../ui/pages/product-page/index.vue'
import SuppliersPage from '../ui/pages/suppliers-page/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsPage,
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/suppliers',
      name: 'supplier',
      component: SuppliersPage,
    },
  ],
})

export default router
