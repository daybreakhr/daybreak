import { createCipheriv, createDecipheriv, createHash } from 'crypto'

/**
 * encrypt text
 *
 * @param plainText text wanted to be encode
 * @param salt crypto key
 */
export function encrypt(plainText: string, salt: string) {
  const hash = createHash('sha1')
  hash.update(salt)

  // `hash.digest()` returns a Buffer by default when no encoding is given
  const key = hash.digest().slice(0, 16)

  // create cipher
  const cipher = createCipheriv('aes-128-cbc', key, Buffer.alloc(16))

  // encrypt text
  let cipherText = cipher.update(plainText, 'utf-8', 'hex')
  cipherText += cipher.final('hex')

  return cipherText
}

/**
 * decrypt text
 *
 * @param cipherText text wanted to be decode
 * @param salt crypto key
 */
export function decrypt(cipherText: string, salt: string) {
  const hash = createHash('sha1')
  hash.update(salt)

  // `hash.digest()` returns a Buffer by default when no encoding is given
  const key = hash.digest().slice(0, 16)

  // create decipher with key
  const decipher = createDecipheriv('aes-128-cbc', key, Buffer.alloc(16))

  // start decrypt
  let plainText = decipher.update(cipherText, 'hex', 'utf8')
  plainText += decipher.final('utf8')

  return plainText
}
