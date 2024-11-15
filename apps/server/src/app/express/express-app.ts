import Express from 'express'
import Cors from 'cors'

import type { IApp } from '@purchase-history/core/interfaces'
import { ProductsRoutes, SuppliersRoutes } from './routes'
import { InvoicesRoutes } from './routes/invoices-routes'

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
  }
}
