<script setup lang="ts">
import Card from '@/ui/components/card/index.vue'

type Props = {
  id: string
  name: string
  email: string
}

defineProps<Props>()
</script>

<template>
  <Card :link="`/suppliers/${id}`">
   <div>
      <h2 class="inline-block mr-3 text-slate-50 font-bold">{{ name }}</h2>
      <strong class="text-slate-300 text-sm">{{ email }}</strong>
   </div>
  </Card>
</template>