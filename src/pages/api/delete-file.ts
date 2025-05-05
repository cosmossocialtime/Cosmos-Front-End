import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
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
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { fileKey } = req.body

  if (!fileKey) {
    return res.status(400).json({ error: 'Parâmetro fileKey é obrigatório' })
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileKey,
    })

    await s3.send(command)

    return res.status(200).json({ message: 'Arquivo deletado com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao deletar o arquivo' })
  }
}
