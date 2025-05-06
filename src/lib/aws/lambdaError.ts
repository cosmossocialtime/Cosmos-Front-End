export class LambdaError extends Error {
  statusCode: number
  body: any

  constructor(message: string, statusCode: number, body: any) {
    super(message)
    this.name = 'LambdaError'
    this.statusCode = statusCode
    this.body = body
  }
}
