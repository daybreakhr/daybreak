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
    cookies: string,
    candidateId: string,
    createdBy: string,
    calendarBody: CreateCalendarDto,
  ) {
    const data = await this.googleService.insertCalendarEvent(
      calendarBody,
      cookies['access-token'],
    )

    const calendar = await this.prismaService.calendar.create({
      data: {
        id: data.id,
        ...calendarBody,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: createdBy } },
      },
    })
    return calendar
  }
}
