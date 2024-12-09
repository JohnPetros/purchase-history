<script setup lang="ts">
import Paginator, { type PageState } from 'primevue/paginator'

import { PAGINATION } from '@purchase-history/core/constants'

type Props = {
  totalRecordsCount: number
}

defineProps<Props>()
const emit = defineEmits(['change'])
</script>


<template>
  <Paginator 
    :rows="PAGINATION.itemsPerPage" 
    :totalRecords="totalRecordsCount" 
    :page="(state: PageState) => emit('change', state.page)">
  </Paginator>
</template>

