/* ******************************************************************************
 * Signing Secret Varification
 *
 * Signing secrets replace the old verification tokens.
 * Slack sends an additional X-Slack-Signature HTTP header on each HTTP request.
 * The X-Slack-Signature is just the hash of the raw request payload
 * (HMAC SHA256, to be precise), keyed by your app’s Signing Secret.
 *
 * More info: https://api.slack.com/docs/verifying-requests-from-slack
 *
 * Tomomi Imura (@girlie_mac)
 * ******************************************************************************/

import { createHmac } from 'crypto'
import { Request } from 'express'
import { RawBodyRequest } from '@nestjs/common'

const secret = process.env.SLACK_SIGNING_SECRET

const hasValidTimestamp = (req: Request) => {
  const timestamp = req.headers['x-slack-request-timestamp'] as string
  if (!timestamp) return false

  // Prevent replay attacks
  const now = Math.floor(Date.now() / 1000)
  if (now - parseInt(timestamp, 10) > 60 * 5) return false

  return true
}

const hasValidSignature = (req: RawBodyRequest<Request>) => {
  if (!secret) return false

  // Check request headers
  const timestamp = req.headers['x-slack-request-timestamp']
  const signature = req.headers['x-slack-signature']
  const requestBody = req.rawBody

  if (!(timestamp && signature)) return false

  // Generate signature w/ request body
  const str = `v0:${timestamp}:${requestBody}`
  const mySignature =
    'v0=' + createHmac('sha256', secret).update(str).digest('hex')

  return mySignature === signature
}

export default function isValidRequestFromSlack(req: Request) {
  return hasValidSignature(req) && hasValidTimestamp(req)
}
