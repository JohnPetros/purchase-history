import { Router } from 'express'
import { ExpressHttp } from '../express-http'
import {
  DeleteSupplierController,
  GetsupplierController,
  ListSuppliersController,
  RegisterSupplierController,
  UpdateSupplierController,
} from 'src/api/controllers/suppliers'
import { GetProductController } from 'src/api/controllers'

export function SuppliersRoutes() {
  const router = Router()

  router
    .get('/suppliers', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ListSuppliersController()
      controller.handle(http)
    })
    .get('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new GetsupplierController()
      controller.handle(http)
    })
    .post('/suppliers', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new RegisterSupplierController()
      controller.handle(http)
    })
    .put('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new UpdateSupplierController()
      controller.handle(http)
    })
    .delete('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new DeleteSupplierController()
      controller.handle(http)
    })

  return router
}
