import type { Candidate, Comment } from '@prisma/client'
import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'

import { AuthService } from 'src/auth/auth.service'
import { AWSSESService } from 'src/aws/aws.ses.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CommentCreatedListener {
  private readonly logger = new Logger('COMMENT CREATED EVENT')
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private sesService: AWSSESService,
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
