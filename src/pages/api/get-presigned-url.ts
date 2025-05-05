import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
})

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
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })

    return res.status(200).json({ uploadUrl })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao gerar URL' })
  }
}
