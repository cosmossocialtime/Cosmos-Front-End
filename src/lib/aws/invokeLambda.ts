import { InvokeCommand } from '@aws-sdk/client-lambda'
import { lambdaClient } from './lambdaClient'
import { parseCookies } from 'nookies'

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

  return JSON.parse(Buffer.from(response.Payload!).toString()) as TOutput
}
