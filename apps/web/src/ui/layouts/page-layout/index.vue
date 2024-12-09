<script setup lang="ts">
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import { DynamicDialog } from 'primevue'

const { path } = useRoute()
</script>

<template>
  <Toast />
  <DynamicDialog />
  <div class="min-h-screen overflow-x-hidden">
    <header class="flex items-center justify-between pr-6 fixed md:hidden top-0 right-0 w-full bg-slate-800 ">
      <div
        class="grid place-content-center size-24 rounded-r-3xl bg-violet-500"
      >
        <img src="@/assets/images/logo.svg" alt="Purchase History" />
      </div>
      <nav>
        <ol class="flex items-center gap-6">
          <li>
            <a href="/" :class="`hover:opacity-85 ${path === '/' ? 'text-slate-50' : 'text-slate-400'}`">
              Products
            </a>
          </li>
          <li>
            <a href="/suppliers" :class="`hover:opacity-85 ${path === '/suppliers' ? 'text-slate-50' : 'text-slate-400'}`">
              Suppliers
            </a>
          </li>
          <li>
            <a href="/invoices" :class="`hover:opacity-85 ${path === '/invoices' ? 'text-slate-50' : 'text-slate-400'}`">
              Invoices
            </a>
          </li>
        </ol>
      </nav>
    </header>

    <aside
      class="fixed hidden md:flex flex-col justify-between top-0 left-0 bottom-0 bg-slate-800 rounded-r-3xl"
    >
      <div
        class="grid place-content-center size-32 rounded-r-3xl bg-violet-500"
      >
        <img src="@/assets/images/logo.svg" alt="Purchase History" />
      </div>

      <nav class="grid place-content-center flex-1 px-5">
        <ol class="space-y-3">
          <li>
            <a href="/" :class="`hover:opacity-85 ${path === '/' ? 'text-slate-50' : 'text-slate-400'}`">
              Products
            </a>
          </li>
          <li>
            <a href="/suppliers" :class="`hover:opacity-85 ${path === '/suppliers' ? 'text-slate-50' : 'text-slate-400'}`">
              Suppliers
            </a>
          </li>
          <li>
            <a href="/invoices" :class="`hover:opacity-85 ${path === '/invoices' ? 'text-slate-50' : 'text-slate-400'}`">
              Invoices
            </a>
          </li>
        </ol>
      </nav>

      <div class="w-full h-px border-t border-slate-600 mt-auto py-12"></div>
    </aside>
    <main class="mx-auto max-w-xl px-6 md:px-0 py-32 md:py-24">
      <slot></slot>
    </main>
  </div>
</template>