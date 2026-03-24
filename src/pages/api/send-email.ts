export async function sendEmail(
  toAddresses: string[],
  subject: string,
  message: string
) {
  await fetch(process.env.NEXT_PUBLIC_API_URL + '/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      toAddresses,
      subject,
      message,
    }),
  })
}
