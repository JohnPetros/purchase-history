<script setup lang="ts">
import { Textarea } from 'primevue'

defineProps({
  id: String,
  name: String,
  label: String,
  placeholder: String,
})
</script>

<template>
  <div>
    <label :for="id" class="block text-slate-50 mb-2">{{ label }}</label>
    <Textarea 
      :id="id" 
      rows="5" 
      :name="name"
      class="!bg-slate-700 !text-slate-50 !border-transparent !w-full"></Textarea>
   </div>
</template>