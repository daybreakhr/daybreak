import axios from 'axios'
import { stringify } from 'qs'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(InternalServerErrorException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    await this.notifyOnSlack({
      path: request.path,
      message: exception.message,
      error: exception.cause,
    })

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.cause,
    })
  }

  async notifyOnSlack({
    path,
    message,
    error,
  }: {
    path: string
    message: string
    error: Error
  }) {
    const botToken = process.env.DAYBUGGER_BOT_TOKEN
    const channelId = process.env.DAYLOGS_CHANNEL_ID
    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*!!!Internal Server Error Detected!!!*',
        },
      },
      { type: 'section', text: { type: 'mrkdwn', text: `path: \`${path}\`` } },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `Message:\n \`\`\`${message}\`\`\`` },
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `Error:\n \`\`\`${error}\`\`\`` },
      },
    ]

    const args = {
      channel: channelId,
      token: botToken,
      blocks: JSON.stringify(blocks),
    }

    await axios.post('https://slack.com/api/chat.postMessage', stringify(args))
  }
}
