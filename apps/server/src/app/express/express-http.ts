import type { Request, Response } from 'express'

import type { IHttp } from '@purchase-history/core/interfaces'
import { HTTP_STATUS_CODE } from '@constants'

export class ExpressHttp implements IHttp {
  constructor(
    private readonly request: Request,
    private readonly response: Response,
  ) {}

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.response.status(statusCode).send(response)
  }

  getBody<Body>(): Body {
    return this.request.body as Body
  }

  getRouteParams<RouteParams>(): RouteParams {
    return this.request.params as RouteParams
  }

  getQueryParams<QueryParams>(): QueryParams {
    return this.request.query as QueryParams
  }

  setHeader(key: string, value: string): void {
    this.response.setHeader(key, value)
  }
}
