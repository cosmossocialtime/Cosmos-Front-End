import { InvokeCommand } from '@aws-sdk/client-lambda'
import { lambdaClient } from './lambdaClient'
import { destroyCookie, parseCookies } from 'nookies'
import { LambdaError } from './lambdaError'
import Router from 'next/router'

export async function invokeLambda<TInput, TOutput>(
  functionName: string,
  payload: TInput
): Promise<TOutput> {
  const { 'cosmos.token': token } = parseCookies()

  if (token) {
    payload = { ...payload, headers: { Authorization: `Bearer ${token}` } }
  }

  const command = new InvokeCommand({
    FunctionName: functionName,
    Payload: Buffer.from(JSON.stringify(payload)),
  })

  const response = await lambdaClient.send(command)

  if (response.FunctionError) {
    throw new Error(`Lambda error: ${response.FunctionError}`)
  }

  const parsed = JSON.parse(Buffer.from(response.Payload!).toString())

  if (parsed.statusCode === 401) {
    destroyCookie(null, 'cosmos.token', { path: '/' })
    destroyCookie(null, 'cosmos.refreshToken', { path: '/' })
    //Router.push('/user/login')
    return Promise.reject(
      new LambdaError('Token expirado ou inválido', 401, parsed.body)
    )
  }

  if (![200, 201].includes(parsed.statusCode)) {
    const message =
      typeof parsed.body === 'string'
        ? parsed.body
        : JSON.stringify(parsed.body)

    throw new LambdaError(
      `Erro ${parsed.statusCode}: ${message}`,
      parsed.statusCode,
      parsed.body
    )
  }

  return parsed as TOutput
}
