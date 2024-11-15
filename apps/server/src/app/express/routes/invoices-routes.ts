import { Router } from 'express'
import { ExpressHttp } from '../express-http'
import {
  GetInvoiceController,
  ListInvoicesController,
  SendInvoiceController,
} from 'src/api/controllers'

export function InvoicesRoutes() {
  const router = Router()

  router
    .get('/invoices', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ListInvoicesController()
      controller.handle(http)
    })
    .get('/invoices/:invoiceId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new GetInvoiceController()
      controller.handle(http)
    })
    .post('/invoices', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new SendInvoiceController()
      controller.handle(http)
    })

  return router
}
