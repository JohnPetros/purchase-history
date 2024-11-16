<script setup lang="ts">
import { ConfirmDialog } from 'primevue'

import Button from '@/ui/components/button/index.vue'
import { useConfirmDialog } from './use-confirm-dialog'

const emit = defineEmits(['confirm', 'cancel'])

const { handleConfirm } = useConfirmDialog(() => emit('confirm'))
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Button @click="handleConfirm" classes="!bg-red-700">
    <slot></slot>
  </Button>
</template>