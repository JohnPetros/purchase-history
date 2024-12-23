import { HTTP_STATUS_CODE } from '../constants'
import { AppError } from '../errors'

type ApiResponseProps<Body> = {
  body?: Body
  statusCode?: number
  errorMessage?: string
}

export class ApiResponse<Body = null> {
  private readonly _body: Body | null
  private readonly _statusCode: number
  private readonly _errorMessage: string | null

  constructor({ body, statusCode, errorMessage }: ApiResponseProps<Body>) {
    this._body = body ?? null
    this._statusCode = statusCode ?? HTTP_STATUS_CODE.ok
    this._errorMessage = errorMessage ?? null
  }

  throwError() {
    throw new AppError(this.errorMessage)
  }

  get isSuccess() {
    return this.statusCode <= HTTP_STATUS_CODE.badRequest
  }

  get isFailure() {
    return this.statusCode >= HTTP_STATUS_CODE.badRequest
  }

  get body(): Body {
    if (this._body === null) {
      throw new AppError('Api response error')
    }

    return this._body
  }

  get statusCode(): number {
    return this._statusCode
  }

  get errorMessage(): string {
    if (!this._errorMessage) {
      throw new Error('Api response error')
    }

    return this._errorMessage
  }
}
