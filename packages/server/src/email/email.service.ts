import { Injectable } from '@nestjs/common'
import { UserRecord } from 'firebase-admin/auth'
import { GmailService } from 'src/google/gmail.service'
import { PrismaService } from 'src/prisma.service'
import { CreateEmailDto } from './email.dto'

@Injectable()
export class EmailService {
  constructor(
    private prismaService: PrismaService,
    private gmailService: GmailService,
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
    user: UserRecord,
    emailBody: CreateEmailDto,
  ) {
    const { body, subject } = emailBody

    const receiverDetails = await this.prismaService.candidate.findFirst({
      where: { id: candidateId },
    })

    const data = await this.gmailService.insertGmailMessage(
      { from: user.email, to: receiverDetails.email, subject, body },
      accessToken,
    )

    const email = await this.prismaService.email.create({
      data: {
        messageId: data.messageId,
        from: user.email,
        to: receiverDetails.email,
        subject,
        body,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: user.uid } },
      },
    })
    return email
  }
}
