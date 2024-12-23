import { Router } from 'express'
import { ExpressHttp } from '../express-http'
import {
  GetInvoiceController,
  ListInvoicesController,
  SendInvoiceController,
  ToggleInvoiceStatusController,
} from 'src/api/controllers'

export function InvoicesRoutes() {
  const router = Router()

  router
    .get('/invoices', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ListInvoicesController()
      await controller.handle(http)
    })
    .get('/invoices/:invoiceId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new GetInvoiceController()
      await controller.handle(http)
    })
    .post('/invoices', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new SendInvoiceController()
      await controller.handle(http)
    })
    .patch('/invoices/status/:invoiceId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ToggleInvoiceStatusController()
      await controller.handle(http)
    })

  return router
}
