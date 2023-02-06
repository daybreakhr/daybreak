import { ConfigService } from '@nestjs/config'
import { google, calendar_v3 } from 'googleapis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GCalService {
  constructor(private configService: ConfigService) {}

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

    const resource: calendar_v3.Schema$Event = {
      ...body,
      conferenceData: {
        createRequest: {
          requestId: '1234567890',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    }

    const { data } = await calendar.events.insert({
      sendUpdates: 'all', // This flag sends email notification of calendar invite to all attendees
      conferenceDataVersion: 1,
      calendarId: this.GOOGLE_CALENDAR_ID,
      requestBody: resource,
    })

    return data
  }
}
