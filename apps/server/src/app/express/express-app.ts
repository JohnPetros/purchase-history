import 'express-async-errors'
import Express, { type NextFunction, type Request, type Response } from 'express'
import Cors from 'cors'

import type { IApp } from '@purchase-history/core/interfaces'
import { AppError, NotFoundError, NotValidError } from '@purchase-history/core/errors'

import { ProductsRoutes, SuppliersRoutes } from './routes'
import { InvoicesRoutes } from './routes/invoices-routes'
import { HTTP_STATUS_CODE } from '@constants'

export class ExpressApp implements IApp {
  private readonly app: Express.Express

  constructor() {
    this.app = Express()
    this.app.use(Express.json())
    this.app.use(Cors())
    this.useRoutes()
  }

  startServer(): void {
    this.app.listen(3333, () =>
      console.log(`📟 server running on port: ${process.env.PORT}`),
    )
  }

  stopServer(): void {
    throw new Error('Method not implemented.')
  }

  private useRoutes() {
    this.app.use(ProductsRoutes())
    this.app.use(SuppliersRoutes())
    this.app.use(InvoicesRoutes())
    this.app.use(this.handleError)
  }

  private handleError(error: Error, _: Request, response: Response, __: NextFunction) {
    console.error('Error Name:', error.name)
    console.error('Error message:', error.message)

    if (error instanceof AppError) {
      const responseError = {
        title: error.title,
        message: error.message,
      }
      console.error('Error title:', error.title)
      console.error('Error message:', error.message)

      if (error instanceof NotFoundError) {
        response.status(HTTP_STATUS_CODE.notFound).json(responseError)
        return
      }

      if (error instanceof NotValidError) {
        response.status(HTTP_STATUS_CODE.badRequest).json(responseError)
        return
      }
    }

    response
      .status(HTTP_STATUS_CODE.serverError)
      .json({ title: 'Server error', message: error.message })
  }
}
