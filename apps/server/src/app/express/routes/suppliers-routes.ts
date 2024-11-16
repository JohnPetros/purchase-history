import { Router } from 'express'
import { ExpressHttp } from '../express-http'
import {
  DeleteSupplierController,
  GetsupplierController,
  ListSuppliersController,
  RegisterSupplierController,
  UpdateSupplierController,
} from 'src/api/controllers/suppliers'

export function SuppliersRoutes() {
  const router = Router()

  router
    .get('/suppliers', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ListSuppliersController()
      await controller.handle(http)
    })
    .get('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new GetsupplierController()
      await controller.handle(http)
    })
    .post('/suppliers', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new RegisterSupplierController()
      await controller.handle(http)
    })
    .put('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new UpdateSupplierController()
      await controller.handle(http)
    })
    .delete('/suppliers/:supplierId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new DeleteSupplierController()
      await controller.handle(http)
    })

  return router
}
