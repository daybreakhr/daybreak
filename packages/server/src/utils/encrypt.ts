import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const iv = randomBytes(16)
const secret = process.env.GOOGLE_ENCRYPT_TOKEN

export async function encrypt(text: string) {
  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer
  const cipher = createCipheriv('aes-256-cbc', key, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return encrypted.toString('hex')
}

export async function decrypt(text: string) {
  const encrypted = Buffer.from(text, 'hex')

  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer
  const decipher = createDecipheriv('aes-256-cbc', key, iv)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decrypted.toString()
}
