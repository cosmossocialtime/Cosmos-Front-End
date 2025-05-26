import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, CopyObjectCommand } from '@aws-sdk/client-s3'

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
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sourceKey, destinationKey } = req.body

  if (!sourceKey || !destinationKey) {
    return res
      .status(400)
      .json({ error: 'sourceKey e destinationKey são obrigatórios' })
  }

  try {
    const command = new CopyObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      CopySource: `${
        process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
      }/${encodeURIComponent(sourceKey)}`,
      Key: destinationKey,
    })

    await s3.send(command)

    return res
      .status(200)
      .json({ success: true, message: 'Arquivo copiado com sucesso' })
  } catch (error) {
    console.error('Erro ao copiar objeto S3:', error)
    return res.status(500).json({ error: 'Erro ao copiar o arquivo' })
  }
}
