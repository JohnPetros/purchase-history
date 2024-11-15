import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../ui/pages/products-page/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsPage,
    },
  ],
})

export default router
