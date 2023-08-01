import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { SlackService } from 'src/slack/slack.service'
import { SlackInstalledEvent } from '../events/slack-installed.event'

@Injectable()
export class SlackInstalledListener {
  constructor(
    @Inject(forwardRef(() => SlackService))
    private slackService: SlackService,
  ) {}

  @OnEvent('slack.installed')
  async sendNotificationOnSlack(payload: SlackInstalledEvent) {
    const { slackUserId } = payload
    await this.slackService.sendMessage({
      channel: slackUserId,
      text: `Dear <@${slackUserId}>,\nWelcome to Daybreak - A new seamless and collaborative way to contribute to your organisation's recruiting engine.`,
    })
  }
}
