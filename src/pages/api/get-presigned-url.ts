import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { fileName, fileType, key } = req.body

  if (!fileName || !fileType || !key) {
    return res.status(400).json({ error: 'Dados incompletos' })
  }

  try {
    const payload = {
      key: key,
      fileType: fileType,
    }

    const uploadUrl = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/s3-get-upload-url',
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

    return res.status(200).json({ uploadUrl })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao gerar URL' })
  }
}
