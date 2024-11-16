import { useToast } from 'primevue'

export function useToastMessage() {
  const toast = useToast()

  function showError(message: string) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: message,
      life: 3000,
    })
  }

  return {
    showError,
  }
}
