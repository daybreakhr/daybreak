import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserRecord } from 'firebase-admin/auth'
import { GmailService } from 'src/google/gmail.service'
import { PrismaService } from 'src/prisma.service'
import { CreateEmailDto } from './email.dto'

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private gmailService: GmailService,
  ) {}

  async createEmailEvent(
    accessToken: string,
    user: UserRecord,
    emailBody: CreateEmailDto,
  ) {
    const { body, subject, candidateId } = emailBody

    const variables = await this.getVariableValues(user, candidateId)

    const receiverDetails = await this.prismaService.candidate.findUnique({
      where: { id: candidateId },
    })

    const sanitizedSubject = this.insertValuesIntoTemplate(subject, variables)
    const sanitizedBody = this.insertValuesIntoTemplate(body, variables)

    const data = await this.gmailService.insertGmailMessage(
      {
        from: user.email,
        to: receiverDetails.email,
        subject: sanitizedSubject,
        body: sanitizedBody,
      },
      accessToken,
    )

    const email = await this.prismaService.email.create({
      data: {
        messageId: data.id,
        from: user.email,
        to: receiverDetails.email,
        subject: sanitizedSubject,
        body: sanitizedBody,
        Candidate: { connect: { id: candidateId } },
        Member: { connect: { uid: user.uid } },
      },
    })
    return email
  }

  async getVariableValues(user: UserRecord, candidateId: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id: candidateId },
      include: { Workspace: true, Job: true },
    })

    const BOARDS_URL = this.configService.get<string>('BOARDS_URL')

    const { firstName, middleName, lastName, Workspace, Job } = candidate
    return {
      candidate_name: `${firstName} ${middleName ?? ''} ${lastName}`,
      sender_name: user.displayName,
      company_name: Workspace.name,
      job_title: Job.title,
      job_link: `${BOARDS_URL}/${Workspace.slug}/jobs/${Job.id}`,
    }
  }

  insertValuesIntoTemplate(template: string, values: Record<string, string>) {
    return template
      .replace(/{{candidate_name}}/g, values.candidate_name)
      .replace(/{{sender_name}}/g, values.sender_name)
      .replace(/{{company_name}}/g, values.company_name)
      .replace(/{{job_title}}/g, values.job_title)
      .replace(/{{job_link}}/g, values.job_link)
  }
}
