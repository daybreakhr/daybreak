import { Injectable } from '@nestjs/common'
import { GoogleService } from 'src/google/google.service'
import { PrismaService } from 'src/prisma.service'
import { CreateCalendarDto } from './calendar.dto'

@Injectable()
export class CalendarService {
  constructor(
    private prismaService: PrismaService,
    private googleService: GoogleService,
  ) {}

  async getAll(candidateId: string) {
    const calendarEvents = await this.prismaService.calendar.findMany({
      where: { candidateId },
    })

    return calendarEvents
  }

  async createCalendarEvent(
    accessToken: string,
    candidateId: string,
    createdBy: string,
    calendarBody: CreateCalendarDto,
  ) {
    const { attendees, title, startTime, endTime } = calendarBody
    const newAttendees = attendees.map((email) => ({ email }))

    const data = await this.googleService.insertCalendarEvent(
      {
        summary: title,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        attendees: newAttendees,
      },
      accessToken,
    )

    const calendar = await this.prismaService.calendar.create({
      data: {
        eventId: data.id,
        ...calendarBody,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: createdBy } },
      },
    })
    return calendar
  }
}
