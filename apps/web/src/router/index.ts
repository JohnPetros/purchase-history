import { createRouter, createWebHistory } from 'vue-router'

import ProductsPage from '../ui/pages/products-page/index.vue'
import ProductPage from '../ui/pages/product-page/index.vue'
import SuppliersPage from '../ui/pages/suppliers-page/index.vue'
import SupplierPage from '../ui/pages/supplier-page/index.vue'
import InvoicesPage from '../ui/pages/invoices-page/index.vue'
import InvoicePage from '../ui/pages/invoice-page/index.vue'

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
      name: 'suppliers',
      component: SuppliersPage,
    },
    {
      path: '/suppliers/:supplierId',
      name: 'supplier',
      component: SupplierPage,
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesPage,
    },
    {
      path: '/invoices/:invoiceId',
      name: 'invoice',
      component: InvoicePage,
    },
  ],
})

export default router
