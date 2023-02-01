import { Injectable } from '@nestjs/common'
import { GoogleService } from 'src/google/google.service'
import { PrismaService } from 'src/prisma.service'
import { CreateEmailDto } from './email.dto'

@Injectable()
export class EmailService {
  constructor(
    private prismaService: PrismaService,
    private googleService: GoogleService,
  ) {}

  async getAll(candidateId: string) {
    const emailEvents = await this.prismaService.email.findMany({
      where: { candidateId },
    })

    return emailEvents
  }

  async createEmailEvent(
    accessToken: string,
    candidateId: string,
    createdBy: string,
    emailBody: CreateEmailDto,
  ) {
    const { body, subject, to } = emailBody

    const data = await this.googleService.insertGmailMessage(
      {
        to,
        subject,
        body,
      },
      accessToken,
    )

    const email = await this.prismaService.email.create({
      data: {
        messageId: data.messageId,
        to,
        subject,
        body,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: createdBy } },
      },
    })
    return email
  }
}
