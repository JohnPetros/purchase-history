export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  send(data: unknown, statusCode?: number): unknown
  setHeader(key: string, value: string): void
}
