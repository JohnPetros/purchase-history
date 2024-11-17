<script setup lang="ts">
import { InputText } from 'primevue'

const emit = defineEmits(['change'])

defineProps({
  id: String,
  label: String,
  name: String,
  type: String,
  default: String,
  placeholder: String,
  readonly: Boolean,
  classes: String,
})

function handleValueChange(value: string | undefined) {
  emit('change', value)
}
</script>

<template>
  <div>
    <label :for="id" class="block text-slate-50 mb-2">{{ label }}</label>
    <InputText 
      :id="id"
      :name="name" 
      :type="type" 
      :defaultValue="default"
      :placeholder="placeholder"
      :readonly="readonly"
      class="!bg-slate-700 !text-slate-50 !border-transparent !w-full" 
      @value-change="handleValueChange"
    />
  </div>
</template>