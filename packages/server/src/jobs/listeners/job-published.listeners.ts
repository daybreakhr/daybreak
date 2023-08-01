import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { SlackService } from 'src/slack/slack.service'
import { JobPublishedEvent } from '../events/job-published.event'

@Injectable()
export class JobPublishedListener {
  private readonly logger = new Logger('JOB PUBLISHED EVENT')
  constructor(
    private prismaService: PrismaService,
    private slackService: SlackService,
  ) {}

  @OnEvent('job.published')
  async sendNotificationToEmployeesOnSlack(payload: JobPublishedEvent) {
    const { jobId } = payload

    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
      include: { Workspace: true },
    })

    const employees = await this.prismaService.member.findMany({
      where: { workspaceId: job.workspaceId, slackUserId: { isSet: true } },
    })

    this.logger.log(`Sending notification to ${employees.length} employees`)

    employees.forEach(({ slackUserId }) => {
      if (slackUserId) {
        this.slackService.sendMessage({
          channel: slackUserId,
          text: `We are now hiring for <${process.env.BOARDS_URL}/${job.Workspace.slug}/jobs/${job.id}|${job.title}>!🚀\nSupport us to close it faster by referring candidates from your network suited for this profile and get exciting referral rewards. 🌟💼`,
        })
      }
    })
  }
}
