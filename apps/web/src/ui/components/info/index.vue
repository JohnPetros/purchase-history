<script setup lang="ts">
defineProps({
  label: String,
  data: String,
})
</script>

<template>
  <dt class="text-sm text-slate-300">{{ label }}</dt>
  <dd class="flex flex-col gap-1 text-slate-50 font-bold mt-2">
    <slot></slot>
  </dd>
</template>