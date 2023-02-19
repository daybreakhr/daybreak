import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

export const encrypt = async (
  token: string,
  secret: string,
  ivByteSize: number,
) => {
  const iv = randomBytes(ivByteSize)

  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer
  const cipher = createCipheriv('aes-256-ctr', key, iv)

  const encryptedToken = Buffer.concat([
    cipher.update(token),
    cipher.final(),
  ]).toString()

  return encryptedToken
}

export const decrypt = async (
  token: string,
  secret: string,
  ivByteSize: number,
) => {
  const googleRefreshTokenBuffer = Buffer.from(token)

  const iv = randomBytes(ivByteSize)

  const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer

  const decipher = createDecipheriv('aes-256-ctr', key, iv)
  const decryptedToken = Buffer.concat([
    decipher.update(googleRefreshTokenBuffer),
    decipher.final(),
  ]).toString()

  return decryptedToken
}
