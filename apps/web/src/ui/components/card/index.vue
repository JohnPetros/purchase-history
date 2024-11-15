<script setup lang="ts">
defineProps({
  link: String,
})
</script>

<template>
   <div class="flex items-center p-6 rounded-md bg-slate-800">
   <div class="flex flex-1 items-center justify-between">
    <slot></slot>
   </div>
    <a :href="link" class="ml-6">
      <i class="pi pi-angle-right font-bold text-indigo-500"></i>
    </a>
  </div>
</template>