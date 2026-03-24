import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { key } = req.body

  if (!key) {
    return res.status(400).json({ error: 'Chave do arquivo ausente' })
  }

  try {
    const payload = {
      key: key,
    }

    const downloadUrl = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/s3-get-download-url',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      }
    )

    return res.status(200).json({ downloadUrl })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao gerar URL' })
  }
}
