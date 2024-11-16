import { Router } from 'express'
import { ExpressHttp } from '../express-http'
import { RegisterProductController } from 'src/api/controllers/products/register-product-controller'
import { ListProductsController } from 'src/api/controllers/products/list-products-controller'
import {
  DeleteProductController,
  GetProductController,
  UpdateProductController,
} from 'src/api/controllers'

export function ProductsRoutes() {
  const router = Router()

  router
    .get('/products', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new ListProductsController()
      await controller.handle(http)
    })
    .get('/products/:productId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new GetProductController()
      await controller.handle(http)
    })
    .post('/products', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new RegisterProductController()
      await controller.handle(http)
    })
    .put('/products/:productId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new UpdateProductController()
      await controller.handle(http)
    })
    .delete('/products/:productId', async (request, response) => {
      const http = new ExpressHttp(request, response)
      const controller = new DeleteProductController()
      await controller.handle(http)
    })

  return router
}
