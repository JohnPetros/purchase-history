import { computed, ref } from 'vue'

export function useItemInput(
  price: number,
  onItemsCountChange: (itemsCount: number) => void,
) {
  const itemsCount = ref(1)

  function handleItemsCountChange(value: string) {
    itemsCount.value = Number(value)
    onItemsCountChange(itemsCount.value)
  }

  const itemPrice = computed(() => {
    return `$${price.toFixed(2)}`
  })

  const amount = computed(() => {
    return `$${(price * itemsCount.value).toFixed(2)}`
  })

  return {
    amount,
    itemPrice,
    itemsCount,
    handleItemsCountChange,
  }
}
