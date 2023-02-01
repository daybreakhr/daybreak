import { ConfigService } from '@nestjs/config'
import { google, calendar_v3 } from 'googleapis'
import { Injectable } from '@nestjs/common'
import * as Nodemailer from 'nodemailer'

@Injectable()
export class GoogleService {
  constructor(private configService: ConfigService) {}

  private GOOGLE_CLIENT_ID =
    this.configService.get<string>('FIREBASE_CLIENT_ID')

  private GOOGLE_CLIENT_SECRET = this.configService.get<string>(
    'FIREBASE_CLIENT_SECRET',
  )

  private GOOGLE_CLIENT_EMAIL = this.configService.get<string>(
    'FIREBASE_CLIENT_EMAIL',
  )

  private GOOGLE_CALENDAR_ID = 'primary'

  private jwtClient = new google.auth.OAuth2({
    clientId: this.GOOGLE_CLIENT_ID,
    clientSecret: this.GOOGLE_CLIENT_SECRET,
  })

  private transporterFn = (accessToken) =>
    Nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.GOOGLE_CLIENT_EMAIL,
        accessToken,
        clientId: this.GOOGLE_CLIENT_ID,
        clientSecret: this.GOOGLE_CLIENT_SECRET,
      },
    })

  async getCalendarEvent(eventId: string, accessToken: string) {
    this.jwtClient.setCredentials({
      access_token: accessToken,
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: this.jwtClient,
    })

    const { data } = await calendar.events.get({
      eventId,
      calendarId: this.GOOGLE_CALENDAR_ID,
    })

    return data
  }

  async insertCalendarEvent(
    body: calendar_v3.Schema$Event,
    accessToken: string,
  ) {
    this.jwtClient.setCredentials({
      access_token: accessToken,
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: this.jwtClient,
    })

    const { data } = await calendar.events.insert({
      requestBody: body,
      sendUpdates: 'all', // This flag sends email notification of calendar invite to all attendees
      calendarId: this.GOOGLE_CALENDAR_ID,
    })

    return data
  }

  async getGmailMessages(accessToken: string) {
    this.jwtClient.setCredentials({
      access_token: accessToken,
    })

    const gmail = google.gmail({
      version: 'v1',
    })

    const { data } = await gmail.users.messages.list({
      userId: 'me',
    })

    return data
  }

  async insertGmailMessage(
    { to, subject, body }: { to: string; subject: string; body: string },
    accessToken: string,
  ) {
    const transporter = this.transporterFn(accessToken)

    const options = {
      from: this.GOOGLE_CLIENT_EMAIL,
      to,
      subject,
      text: body,
    }

    const data = await transporter.sendMail(options)

    return data
  }
}
