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
        where: { workspaceId: WORKSPACE_ID, isPublished: true },
        include: { Workspace: true },
      })

      const view = this.slackViews.homeView(body.event.user, jobs)
      await this.publishHomeView(body.event.user, view)
    }
  }

  async handleAction(body: any) {
    const { actions, trigger_id, user, type } = JSON.parse(body.payload)

    if (actions && actions[0].action_id.match(/refer_/)) {
      const jobId = actions[0].action_id.split('_')[1]
      const modal = this.slackViews.referModal(user.id, jobId)

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
    } else if (type === 'view_submission') {
      const { view } = JSON.parse(body.payload)
      const jobId = view.callback_id
      const name = view.state.values.referalName.fullName.value
      // const email = view.state.values.referalEmail.email.value
      // const phoneNumber = view.state.values.referalPhone.phoneNumber.value
      // const linkedInUrl = view.state.values.referalLinkedIn.linkedInUrl.value

      const { title } = await this.prismaService.job.findUnique({
        where: { id: jobId },
      })

      await this.sendMessage(
        user.id,
        `You have referred *${name}* for the job *${title}*`,
      )
    }
  }

  async sendMessage(channel: string, text: string) {
    const args = { token: process.env.SLACK_BOT_TOKEN, channel, text }

    await axios.post('https://slack.com/api/chat.postMessage', stringify(args))
  }

  async publishHomeView(user: string, view: string) {
    const args = { user_id: user, token: process.env.SLACK_BOT_TOKEN, view }

    await axios.post('https://slack.com/api/views.publish', stringify(args))
  }
}
