import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCalendarDto } from './calendar.dto'

@Injectable()
export class CalendarService {
  constructor(private prismaService: PrismaService) {}

  async getAll(candidateId: string) {
    const calendarEvents = await this.prismaService.calendar.findMany({
      where: { candidateId },
    })

    return calendarEvents
  }

  async createCalendarEvent(
    candidateId: string,
    createdBy: string,
    calendarBody: CreateCalendarDto,
  ) {
    const calendar = await this.prismaService.calendar.create({
      data: {
        ...calendarBody,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: createdBy } },
      },
    })
    return calendar
  }
}
