import { google } from 'googleapis'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GmailService {
  constructor(private configService: ConfigService) {}

  private GOOGLE_CLIENT_ID =
    this.configService.get<string>('FIREBASE_CLIENT_ID')

  private GOOGLE_CLIENT_SECRET = this.configService.get<string>(
    'FIREBASE_CLIENT_SECRET',
  )

  private jwtClient = new google.auth.OAuth2({
    clientId: this.GOOGLE_CLIENT_ID,
    clientSecret: this.GOOGLE_CLIENT_SECRET,
  })

  createMessage(to: string, from: string, subject: string, body: string) {
    const str = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      'Content-Transfer-Encoding: 7bit\n',
      'to: ',
      to,
      '\n',
      'from: ',
      from,
      '\n',
      'subject: ',
      subject,
      '\n\n',
      body,
    ].join('')

    const encodedMail = Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    return encodedMail
  }

  async getGmailMessages(accessToken: string) {
    this.jwtClient.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: 'v1', auth: this.jwtClient })
    const { data } = await gmail.users.messages.list({ userId: 'me' })
    return data
  }

  async insertGmailMessage(
    {
      from,
      to,
      subject,
      body,
    }: { from: string; to: string; subject: string; body: string },
    accessToken: string,
  ) {
    this.jwtClient.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: 'v1', auth: this.jwtClient })

    const message = {
      raw: this.createMessage(to, from, subject, body),
    }

    const { data } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: message,
    })

    return data
  }
}
