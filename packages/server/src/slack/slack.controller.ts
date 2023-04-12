import { Body, Controller, Post } from '@nestjs/common'
import { SlackService } from './slack.service'

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('events')
  async slackEvents(@Body() body: any) {
    switch (body.type) {
      case 'url_verification':
        return this.slackService.verifyUrl(body)
      case 'event_callback':
        return this.slackService.handleEvent(body)
    }
  }
}
