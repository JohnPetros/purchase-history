<script setup lang="ts">
import { Button } from 'primevue'

defineProps<{ type?: 'button' | 'submit' | 'reset' | undefined; classes?: string }>()
</script>

<template>
  <Button :type="type ?? 'button'" :class="`!text-slate-50 !border-transparent hover:opacity-80 !transition-opacity !duration-200 ${classes ?? '!bg-violet-500'}`">
    <slot></slot>
  </Button>
</template>