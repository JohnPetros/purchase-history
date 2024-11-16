import { AppError } from './app-error'

export class NotValidError extends AppError {
  constructor(message: string) {
    super('Not Valid Error', message)
  }
}
