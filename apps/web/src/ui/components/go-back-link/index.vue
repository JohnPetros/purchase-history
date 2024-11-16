<script setup lang="ts">
defineProps({
  href: String,
})
</script>

<template>
  <a :href="href" class="flex items-center gap-3 text-slate-50">
    <i class="pi pi-angle-left font-bold text-indigo-500"></i>
    go back
  </a>
</template>