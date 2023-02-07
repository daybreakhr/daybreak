import { google } from 'googleapis'
import * as Nodemailer from 'nodemailer'
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

  async getGmailMessages(accessToken: string) {
    this.jwtClient.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: 'v1' })
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
    const transporterFn = (from: string, accessToken: string) =>
      Nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: from,
          accessToken,
          clientId: this.GOOGLE_CLIENT_ID,
          clientSecret: this.GOOGLE_CLIENT_SECRET,
        },
      })

    const transporter = transporterFn(from, accessToken)
    const options = { from, to, subject, text: body }
    const data = await transporter.sendMail(options)
    return data
  }
}
