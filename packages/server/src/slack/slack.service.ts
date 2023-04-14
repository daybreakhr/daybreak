import axios from 'axios'
import { stringify } from 'qs'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SlackViews } from './slack.views'

const WORKSPACE_ID = '6317158147089f094cd4598e'

@Injectable()
export class SlackService {
  private logger = new Logger('SLACK')
  constructor(
    private prismaService: PrismaService,
    private slackViews: SlackViews,
  ) {}

  verifyUrl(body: any) {
    return body.challenge
  }

  async handleEvent(body: any) {
    const { type } = body.event

    if (type === 'app_home_opened') {
      const jobs = await this.prismaService.job.findMany({
        where: {
          workspaceId: WORKSPACE_ID,
          isPublished: true,
        },
        include: {
          Workspace: true,
        },
      })

      const args = {
        user_id: body.event.user,
        token: process.env.SLACK_BOT_TOKEN,
        view: this.slackViews.homeView(body.event.user, jobs),
      }

      const { data } = await axios.post(
        'https://slack.com/api/views.publish',
        stringify(args),
      )
      this.logger.log(data, 'Home View')
    }
  }

  async handleAction(body: any) {
    const { actions, trigger_id, user } = JSON.parse(body.payload)

    if (actions && actions[0].action_id === 'button_click') {
      const modal = this.slackViews.referModal(user.id)

      const args = {
        token: process.env.SLACK_BOT_TOKEN,
        trigger_id,
        view: JSON.stringify(modal),
      }

      const { data } = await axios.post(
        'https://slack.com/api/views.open',
        stringify(args),
      )

      this.logger.log(data, 'Refer Modal')
    }
  }
}
