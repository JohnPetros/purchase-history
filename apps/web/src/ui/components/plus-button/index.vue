<script setup lang='ts'>
import Button from 'primevue/button'
</script>


<template>
  <Button class="!bg-indigo-500 !text-slate-50 !rounded-full !border-none hover:opacity-80 !transition-opacity !duration-200">
    <div class="grid place-content-center rounded-full size-8 text-xs bg-slate-50">
      <i class="pi pi-plus font-bold text-indigo-500" style="font-size: .8rem;"></i>
    </div>
    <slot></slot>
  </Button>
</template>