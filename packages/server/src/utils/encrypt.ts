import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import type { EncryptedData } from '@prisma/client'

const iv = randomBytes(16)
const secret = process.env.GOOGLE_ENCRYPT_TOKEN

export async function encrypt(text: string) {
  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer
  const cipher = createCipheriv('aes-256-cbc', key, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return { iv: iv.toString('hex'), text: encrypted.toString('hex') }
}

export async function decrypt(data: EncryptedData) {
  const iv = Buffer.from(data.iv, 'hex')
  const encrypted = Buffer.from(data.text, 'hex')

  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer
  const decipher = createDecipheriv('aes-256-cbc', key, iv)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decrypted.toString()
}

/**
{
  key: 'b029695e01a4e3796b67c7573bf236acd3260bc316e66ba3863f3981b4186725',
  iv: 'd06f4e33d864adfdfcf7810045c6d60e'
}

{
  key: 'b029695e01a4e3796b67c7573bf236acd3260bc316e66ba3863f3981b4186725',
  iv: '98eae1b6cee808c56d74e3ea4d119106'
}
 */
