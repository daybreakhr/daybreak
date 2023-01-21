import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class GoogleService {
  private logger = new Logger('HTTP')

  private GOOGLE_CLIENT_ID =
    this.configService.get<string>('FIREBASE_CLIENT_ID')

  private GOOGLE_CLIENT_SECRET = this.configService.get<string>(
    'FIREBASE_CLIENT_SECRET',
  )

  private GOOGLE_CALENDAR_ID = 'primary'

  private jwtClient = new google.auth.OAuth2({
    clientId: this.GOOGLE_CLIENT_ID,
    clientSecret: this.GOOGLE_CLIENT_SECRET,
  })

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getCalendarEvent(accessToken: string) {
    this.jwtClient.setCredentials({
      access_token: accessToken,
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: this.jwtClient,
    })

    const { data } = await calendar.calendars.get({
      calendarId: this.GOOGLE_CALENDAR_ID,
    })

    return data
  }

  async insertCalendarEvent(body: any, accessToken: string) {
    this.jwtClient.setCredentials({
      access_token: accessToken,
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: this.jwtClient,
    })

    const { data } = await calendar.calendars.insert({
      requestBody: body,
    })

    return data
  }
}
