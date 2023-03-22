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

  async getAll(candidateId: string) {
    const calendarEvents = await this.prismaService.calendar.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    return calendarEvents
  }

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
}
