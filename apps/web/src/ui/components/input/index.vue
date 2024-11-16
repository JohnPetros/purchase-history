<script setup lang="ts">
import { InputText } from 'primevue'

defineProps({
  id: String,
  label: String,
  name: String,
  type: String,
  default: String,
  placeholder: String,
})
</script>

<template>
  <div>
    <label :for="id" class="block text-slate-50 mb-2">{{ label }}</label>
    <InputText 
      :id="id"
      :name="name" 
      :type="type" 
      default="ggggggggggggggggggggggg"
      :placeholder="placeholder" 
      class="!bg-slate-700 !text-slate-50 !border-transparent !w-full" 
    />
  </div>
</template>