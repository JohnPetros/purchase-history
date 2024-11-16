<script setup lang="ts">
import Code from '@/ui/components/code/index.vue'
import Card from '@/ui/components/card/index.vue'

const { id, code, name, price } = defineProps({
  id: String,
  code: String,
  name: String,
  price: String,
})
</script>

<template>
  <Card :link="`/products/${id}`">
    <Code>
      {{  code }}
    </Code>
    <h2 class="text-slate-50">{{ name }}</h2>
    <strong class="text-slate-50 text-lg font-bold">{{ price }}</strong>
  </Card>
</template>