<script setup lang="ts">
import { ref } from 'vue'
import Drawer from 'primevue/drawer'

defineProps({
  title: String,
})

const emit = defineEmits(['open', 'close'])
const isVisible = ref(false)

function open() {
  isVisible.value = true
  emit('open')
}

function close() {
  isVisible.value = false
  emit('close')
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Drawer v-model:visible="isVisible" :header="title" class="!bg-slate-900 !border-none !w-[36rem] !text-slate-50">
    <slot name="content"></slot>
  </Drawer>
  <Button icon="pi pi-arrow-right" @click="open" asChild>
    <slot name="trigger"></slot>
  </Button>
</template>