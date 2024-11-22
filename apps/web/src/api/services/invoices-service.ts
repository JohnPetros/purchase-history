import type { IApiClient, IInvoicesService } from '@purchase-history/core/interfaces'

export const InvoicesService = (apiClient: IApiClient): IInvoicesService => {
  return {
    async getInvoice(invoiceId) {
      return await apiClient.get(`/invoices/${invoiceId}`)
    },

    async listInvoices({ status, productId }) {
      if (status && ['paid', 'pending'].includes(status)) apiClient.setParam('status', status)
      if (productId) apiClient.setParam('productId', productId)

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
