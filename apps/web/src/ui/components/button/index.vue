<script setup lang="ts">
import { Button, type ButtonProps } from 'primevue'

defineProps</* @vue-ignore */ ButtonProps>()
</script>

<template>
  <Button :type="type" class="!bg-indigo-500 !text-slate-50 !border-transparent hover:opacity-80 !transition-opacity !duration-200">
    <slot></slot>
  </Button>
</template>