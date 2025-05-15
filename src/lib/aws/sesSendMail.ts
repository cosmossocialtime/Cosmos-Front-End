import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
})

export async function sendEmail(
  toAdresses: string[],
  subject: string,
  message: string
) {
  await sesClient.send(
    new SendEmailCommand({
      Source: process.env.NEXT_PUBLIC_AWS_EMAIL_SOURCE,
      Destination: {
        ToAddresses: toAdresses,
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: message },
        },
      },
    })
  )
}
