import type { IApiClient, IInvoicesService } from '@purchase-history/core/interfaces'

export const InvoicesService = (apiClient: IApiClient): IInvoicesService => {
  return {
    async getInvoice(invoiceId) {
      return await apiClient.get(`/invoices/${invoiceId}`)
    },

    async listInvoices() {
      return await apiClient.get('/invoices')
    },

    async sendInvoice(invoiceDto, invoiceItems) {
      return await apiClient.post('/invoices', {
        invoice: invoiceDto,
        items: invoiceItems,
      })
    },

    async toggleInvoiceStatus(invoiceId) {
      return await apiClient.patch(`/invoices/status/${invoiceId}`)
    },
  }
}
