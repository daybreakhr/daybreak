import { ConfigService } from '@nestjs/config'
import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'
import type { Candidate, Comment } from '@prisma/client'

import { AuthService } from 'src/auth/auth.service'
import { SlackService } from 'src/slack/slack.service'
import { AWSSESService } from 'src/aws/aws.ses.service'
import { MembersService } from 'src/members/members.service'

@Injectable()
export class CommentCreatedListener {
  private readonly logger = new Logger('COMMENT CREATED EVENT')

  constructor(
    private authService: AuthService,
    private sesService: AWSSESService,
    private configService: ConfigService,
    private membersService: MembersService,
    private slackService: SlackService,
  ) {}

  APP_URL = this.configService.get<string>('FRONTEND_URL')

  @OnEvent('comment.created')
  async sendEmailNotificationToMentions(
    payload: Comment & { Candidate: Candidate },
  ) {
    const { content, candidateId, Candidate } = payload
    const text = this.getTextFromContent(content)
    const mentionIds = this.getMentionsFromContent(content)

    if (mentionIds?.length > 0) {
      const mentions = await this.authService.getUsers(mentionIds)
      const subject = 'You were mentioned in a comment'
      const body = `<p>You were mentioned in a comment:</p> 
      <p>${text}</p>
      <p>View the comment here: <a href="${this.APP_URL}/jobs/${Candidate.jobId}?candidateId=${candidateId}">Candidate Profile</a></p>
      <p>Regards,<br />Daybreak Admin</p>`

      mentions.forEach(async ({ email }) => {
        if (email) {
          await this.sesService.sendMail({ to: email, subject, body })
        }
      })
    }
  }

  @OnEvent('comment.created')
  async sendSlackNotificationToMentions(
    payload: Comment & { Candidate: Candidate },
  ) {
    const { content, createdBy } = payload
    const mentionIds = this.getMentionsFromContent(content)

    if (mentionIds?.length > 0) {
      const mentions = await this.membersService.getMembersByUids(
        mentionIds.map(({ uid }) => uid),
      )

      const slackIds = mentions
        .map(({ slackUserId }) => slackUserId)
        .filter(Boolean)

      if (slackIds.length > 0) {
        const slackMessage = await this.getSlackMessageFromContent(
          payload,
          createdBy,
        )

        slackIds.forEach(async (slackId) => {
          await this.slackService.sendMessage({
            channel: slackId,
            blocks: slackMessage,
          })
        })
      }
    }
  }

  async getSlackMessageFromContent(
    payload: Comment & { Candidate: Candidate },
    createdBy: string,
  ) {
    const { content, candidateId, Candidate } = payload
    const { slackUserId, displayName } =
      await this.membersService.getMemberByUid(createdBy)

    const sender = slackUserId ? `<@${slackUserId}>` : displayName

    const slackMessage = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${sender} added a comment on a ${Candidate.firstName}'s profile and mentioned you.`,
        },
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*${this.getTextFromContent(content)}*` },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${this.APP_URL}/jobs/${Candidate.jobId}?candidateId=${candidateId}|View Profile>`,
        },
      },
    ]
    return JSON.stringify(slackMessage)
  }

  getTextFromContent(content: any): string {
    try {
      const text = content?.content?.[0].content?.map((item: any) => {
        switch (item.type) {
          case 'text':
            return item.text
          case 'mentionAtom':
            return `@${item.attrs.label}`
          default:
            return ''
        }
      })

      return text.join(' ')
    } catch (e) {
      this.logger.error(e, 'Unable to get text from content')
    }
  }

  getMentionsFromContent(content: any) {
    try {
      const mentions = content?.content?.[0].content?.filter((item: any) => {
        return item.type === 'mentionAtom'
      })
      return mentions.map((mention: any) => ({
        uid: mention.attrs.id,
      })) as Array<{ uid: string }>
    } catch (error) {
      this.logger.error(error, 'Unable to get mentions from content')
    }
  }
}
