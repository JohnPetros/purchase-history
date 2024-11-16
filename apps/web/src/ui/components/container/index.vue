<script setup lang="ts">
defineProps({
  className: String,
})
</script>

<template>
  <div :class="`bg-slate-800 rounded-md p-6 ${className}`">
    <slot></slot>
  </div>
</template>