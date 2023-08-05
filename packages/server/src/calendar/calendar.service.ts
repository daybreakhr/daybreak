import { Injectable } from '@nestjs/common'
import { GCalService } from 'src/google/calendar.service'
import { PrismaService } from 'src/prisma.service'
import { CreateCalendarDto } from './calendar.dto'

@Injectable()
export class CalendarService {
  constructor(
    private prismaService: PrismaService,
    private gCalService: GCalService,
  ) {}

  async createCalendarEvent(
    accessToken: string,
    createdBy: string,
    calendarBody: CreateCalendarDto,
  ) {
    const { attendees, title, startTime, endTime } = calendarBody
    const newAttendees = attendees.map((email) => ({ email }))

    const data = await this.gCalService.insertCalendarEvent(
      {
        summary: title,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        attendees: newAttendees,
      },
      accessToken,
    )

    const { candidateId, ...restBody } = calendarBody
    const calendar = await this.prismaService.calendar.create({
      data: {
        eventId: data.id,
        ...restBody,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: createdBy } },
      },
    })
    return calendar
  }

  async deleteCalendarEvent(id: string, accessToken: string) {
    // Get eventId of calendar event from database
    const { eventId } = await this.prismaService.calendar.findUnique({
      where: { id },
    })

    // Delete event from google calendar
    await this.gCalService.deleteCalendarEvent(eventId, accessToken)

    // Delete event from database
    const calendar = await this.prismaService.calendar.delete({ where: { id } })
    return calendar
  }
}
