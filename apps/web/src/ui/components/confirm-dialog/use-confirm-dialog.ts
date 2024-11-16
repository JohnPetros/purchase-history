import { useConfirm } from 'primevue'

export function useConfirmDialog(onConfirm: VoidFunction) {
  const confirm = useConfirm()

  function handleConfirm() {
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Confirm',
        class: '!bg-red-700 !border-none',
      },
      accept: onConfirm,
    })
  }

  return {
    handleConfirm,
  }
}
